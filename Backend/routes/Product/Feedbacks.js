const express = require("express");
const Router = express.Router();
const Product = require("../../models/Products.js");
const FeedBack = require("../../models/FeedBack.js");
const fetchUser = require("../../middleware/fetchUserr.js");

Router.post("/feedback", fetchUser, async (req, res) => {
  try {
    const ids = req.body.id;
    let feedbacks = [];
    for (let i = 0; i < ids.length; i++) {
      const feedback = await FeedBack.findById(ids[i]);
      feedbacks.push(feedback);
    }
    res.status(201).json({
      success: true,
      feedbacks: feedbacks,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = Router;
