const express = require("express");
const router = express.Router();
const Farmer = require("../../models/Farmer.js");
const Buyer = require("../../models/Buyer.js");
const Order = require("../../models/Order.js");
const fetchUser = require("../../middleware/fetchUserr.js");
const Product = require("../../models/Products.js");

// ROUTE 1: Show Order Received to the farmer:GET "/api/inventory/show".
router.get("/show", fetchUser, async (req, res) => {
  try {
    const farmer = await Farmer.findById(req.user.id);
    const orderIds = farmer.orders;
    const orders = [];

    for (let i = 0; i < orderIds.length; i++) {
      const order = await Order.findById(orderIds[i]);
      orders.push(order);
    }

    // Send success response
    res.status(201).json({
      success: true,
      orders: orders,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/status", fetchUser, async (req, res) => {
  try {
    const orderId = req.body.id;
    const status = req.body.status;
    if (status === "pending") {
      await Order.findByIdAndUpdate(orderId, {
        status: "processing",
      });
      res.status(200).json({ success: true, status: "processing" });
    } else if (status === "processing") {
      await Order.findByIdAndUpdate(orderId, {
        status: "shipped",
      });
      res.status(200).json({ success: true, status: "shipped" });
    } else if (status === "shipped") {
      const code = req.body.OTP;
      const order = await Order.findById(orderId).select();

      const otp = order.OTP;

      // changing status
      if (code == otp) {
        await Order.findByIdAndUpdate(orderId, {
          status: "delivered",
        });

        // Set history and current section
        await Farmer.findByIdAndUpdate(order.farmer_id, {
          $pull: { orders: orderId },
        });
        await Farmer.findByIdAndUpdate(order.farmer_id, {
          $push: { orderHistory: orderId },
        });
        await Farmer.findByIdAndUpdate(order.farmer_id, {
          $pull: { orders: orderId },
        });
        await Buyer.findByIdAndUpdate(order.buyer_id, {
          $pull: { order: orderId },
        });
        await Buyer.findByIdAndUpdate(order.buyer_id, {
          $push: { orderHistory: order },
        });

        // adding price
        await Product.findByIdAndUpdate(order.productId, {
          $inc: { profit: order.price },
        });

        res.status(200).json({ success: true, status: "delivered" });
      } else {
        res.status(400).json({ success: false, message: "Invalid OTP" });
      }
    } else {
      res.status(400).json({ success: false, message: "Invalid status" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
