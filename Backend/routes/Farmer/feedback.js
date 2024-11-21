const express = require("express");
const Router = express.Router();
const Feedback = require("../../models/FeedBack.js");
const Farmer = require("../../models/Farmer.js");
const Order = require("../../models/Order.js");
const fetchUser = require("../../middleware/fetchUserr.js");

Router.get("/show", fetchUser, async (req, res) => {
  try {
    const feedIds = await Farmer.findById(req.user.id).select("feedback");
    const feedbackIds = feedIds.feedback;
    const feedbackData = [];
    for (let i = 0; i < feedbackIds.length; i++) {
      const history = await Feedback.findById(feedbackIds[i]);
      feedbackData.push(history);
    }

    // Send success response
    res.status(201).json({
      success: true,
      feedback: feedbackData,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = Router;
