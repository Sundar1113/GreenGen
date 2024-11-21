const express = require("express");
const Router = express.Router();
const Product = require("../../models/Products.js");
const User = require("../../models/User.js");
const fetchUser = require("../../middleware/fetchUserr.js");

// ROUTE 1: Create a new Product using:POST "/api/product/view".
Router.get("/view", fetchUser, async (req, res) => {
  try {
    const buyer = await User.findById(req.user.id);
    const pin = buyer.pin;

    const response = await Product.find().select();

    res.json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = Router;
