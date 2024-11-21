const express = require("express");
const Router = express.Router();
const Order = require("../../models/Order.js");
const Buyer = require("../../models/Buyer.js");
const Farmer = require("../../models/Farmer.js");
const User = require("../../models/User.js");
const FeedBack = require("../../models/FeedBack.js");
const Product = require("../../models/Products.js");
const fetchUser = require("../../middleware/fetchUserr.js");

Router.post("/submit", fetchUser, async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findById(req.user.id);
    const orderId = req.body.orderId;
    const name = user.name;
    const newFeedback = {
      name: name,
      review: req.body.review,
      rating: req.body.rating,
      productId: req.body.productId,
      product_name: req.body.product_name,
      quantity: req.body.quantity,
      price: req.body.price,
      date: new Date(),
      image: req.body.image,
    };
    const feedbackId = await FeedBack.create(newFeedback);
    await Order.findByIdAndUpdate(orderId, {
      feedback_done: true,
    });

    await Buyer.findByIdAndUpdate(req.user.id, {
      $push: { review: feedbackId._id },
    });
    await Farmer.findByIdAndUpdate(req.body.farmer_id, {
      $push: { feedback: feedbackId._id },
    });

    //Product Rating Update
    const check = await Product.findById(req.body.productId).select("feedback");
    const r = await Product.findById(req.body.productId).select("rating");
    const len = check.feedback.length;
    if (len > 0) {
      let rating = r.rating;
      let newRating = (rating * len + req.body.rating) / (len + 1);
      newRating = parseFloat(newRating.toFixed(1));
      await Product.findByIdAndUpdate(req.body.productId, {
        $push: { feedback: feedbackId._id },
        $set: { rating: newRating },
      });
    } else {
      await Product.findByIdAndUpdate(req.body.productId, {
        $push: { feedback: feedbackId._id },
        $set: { rating: req.body.rating },
      });
    }

    // Send success response
    res.status(201).json({
      success: true,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = Router;
