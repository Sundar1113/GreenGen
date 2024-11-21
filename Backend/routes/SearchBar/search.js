const express = require("express");
const Router = express.Router();
const Product = require("../../models/Products.js");
const FeedBack = require("../../models/FeedBack.js");
const fetchUser = require("../../middleware/fetchUserr.js");

Router.get("/show/:name", fetchUser, async (req, res) => {
  try {
    const name = req.params.name;
    const response = await Product.find({ productName: name }).select();
    if (response.length === 0) {
      return res
        .status(404)
        .json({ message: `Product with name '${name}' not found` });
    } else {
      res.json(response);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = Router;
