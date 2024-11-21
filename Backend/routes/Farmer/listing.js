const express = require("express");
const router = express.Router();
const User = require("../../models/User.js");
const Farmer = require("../../models/Farmer.js");
const Product = require("../../models/Products.js");
const fetchUser = require("../../middleware/fetchUserr.js");

// ROUTE 1: Create a new Product using:POST "/api/product/listing".
router.post("/listing", fetchUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const newProduct = {
      owner_id: user._id,
      owner: user.name,
      productName: req.body.productName,
      AloQuantity: req.body.quantity,
      CurQuantity: req.body.quantity,
      description: req.body.description,
      price: req.body.price,
      cat: req.body.cat,
      state: user.state,
      city: user.city,
      pin: user.pin,
      image: req.body.image,
    };
    //Create the new product
    const product = await Product.create(newProduct);

    // Add the product ID to the farmer's products array

    await Farmer.updateOne(
      { _id: req.user.id },
      { $push: { products: product._id } }
    );

    // Send success response
    res.status(201).json({
      success: true,
      message: "Product listed successfully",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
