const express = require("express");
const Router = express.Router();
const Product = require("../../models/Products.js");
const fetchUser = require("../../middleware/fetchUserr.js");

Router.post("/details", fetchUser, async (req, res) => {
  try {
    const id = req.body.id;
    console.log(id);
    const productDetails = await Product.findById(id).select();
    // Send success response
    res.status(201).json({
      success: true,
      details: productDetails,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = Router;
