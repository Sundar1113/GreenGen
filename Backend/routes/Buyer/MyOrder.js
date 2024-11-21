const express = require("express");
const Router = express.Router();
const Product = require("../../models/Products.js");
// const User = require("../../models/User.js");
const Buyer = require("../../models/Buyer.js");
const Farmer = require("../../models/Farmer.js");
const Order = require("../../models/Order.js");
const fetchUser = require("../../middleware/fetchUserr.js");

// ROUTE 1: Show Orders to the Buyer:GET "/api/myOrder/show".
Router.get("/show", fetchUser, async (req, res) => {
  try {
    const orders = await Buyer.findById(req.user.id).select("order");
    const orderId = orders.order;
    const totalOrders = [];
    for (let i = 0; i < orderId.length; i++) {
      let order = await Order.findById(orderId[i]);
      totalOrders.push(order);
    }
    res.status(200).json({
      success: true,
      order: totalOrders,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// ROUTE 2: Remove a Order"."/api/myOrder/cancel"
Router.delete("/cancel/:index", fetchUser, async (req, res) => {
  try {
    const index = req.params.index;
    const order = await Buyer.findById(req.user.id).select("order");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    const orderId = order.order[index];
    const data = await Order.findById(orderId).select();
    data.status = "canceled";

    await Product.findByIdAndUpdate(data.productId, {
      $inc: { CurQuantity: data.quantity }, // increment the CurQuantity by the data quantity
    });

    await Buyer.findByIdAndUpdate(req.user.id, {
      $pull: { order: orderId },
    });

    await Farmer.findByIdAndUpdate(data.farmer_id, {
      $pull: { orders: orderId },
    });

    const orderIds = await Buyer.findById(req.user.id).select("order");
    const updateOrders = orderIds.order;
    const orders = [];
    for (let i = 0; i < updateOrders.length; i++) {
      const order = await Order.findById(updateOrders[i]);
      orders.push(order);
    }

    res.status(200).json({
      success: true,
      orders: orders,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = Router;
