const express = require("express");
const router = express.Router();
const User = require("../../models/User.js");
const Farmer = require("../../models/Farmer.js");
const Buyer = require("../../models/Buyer.js");
const fetchUser = require("../../middleware/fetchUserr.js");

// ROUTE 1: Create a new Product using:POST "/api/product/listing".
router.post("/profile", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id; // Get the authenticated user's ID

    // Extract profile data from the request body
    const { name, state, city, pin, role } = req.body;

    // Create a new product object with the provided data
    const newProfileData = { name, state, city, pin };

    const user = await User.findOneAndUpdate({ _id: userId }, newProfileData, {
      new: true, // Return updated document
      upsert: true, // Create new document if not exists
    });

    // Determine user role and update the corresponding model
    if (role === "farmer") {
      // Update farmer profile
      await Farmer.findOneAndUpdate({ _id: userId }, newProfileData, {
        new: true, // Return updated document
        upsert: true, // Create new document if not exists
      });
    } else if (role === "buyer") {
      // Update buyer profile
      await Buyer.findOneAndUpdate({ _id: userId }, newProfileData, {
        new: true, // Return updated document
        upsert: true, // Create new document if not exists
      });
    } else {
      // Invalid role provided
      return res.status(400).json({
        success: false,
        message: "Invalid role specified",
      });
    }

    // Send success response
    res.status(201).json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    // Handle any errors
    console.error("Profile update error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    });
  }
});

module.exports = router;
