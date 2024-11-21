const express = require("express");
const Router = express.Router();
const Product = require("../../models/Products.js");
// const User = require("../../models/User.js");
const Buyer = require("../../models/Buyer.js");
const Farmer = require("../../models/Farmer.js");
const Order = require("../../models/Order.js");
const fetchUser = require("../../middleware/fetchUserr.js");

Router.get("/show", fetchUser, async (req, res) => {
  try {
    const historyIds = await Farmer.findById(req.user.id).select(
      "orderHistory"
    );
    const historyData = [];
    for (let i = 0; i < historyIds.orderHistory.length; i++) {
      const history = await Order.findById(historyIds.orderHistory[i]);
      historyData.push(history);
    }

    // Send success response
    res.status(201).json({
      success: true,
      history: historyData,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = Router;
