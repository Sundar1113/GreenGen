const express = require("express");
const Router = express.Router();
const Feedback = require("../../models/FeedBack.js");
const Buyer = require("../../models/Buyer.js");
const fetchUser = require("../../middleware/fetchUserr.js");

Router.get("/show", fetchUser, async (req, res) => {
  try {
    const feedIds = await Buyer.findById(req.user.id).select("review");
    const feedbackIds = feedIds.review;
    const feedbackData = [];
    for (let i = 0; i < feedbackIds.length; i++) {
      const history = await Feedback.findById(feedbackIds[i]);
      feedbackData.push(history);
    }

    // Send success response
    res.status(201).json({
      success: true,
      review: feedbackData,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = Router;
