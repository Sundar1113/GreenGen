const express = require("express");
const Router = express.Router();
const Product = require("../../models/Products.js");
// const User = require("../../models/User.js");
const Buyer = require("../../models/Buyer.js");
const Farmer = require("../../models/Farmer.js");
const Order = require("../../models/Order.js");
const fetchUser = require("../../middleware/fetchUserr.js");

// ROUTE 1: Place Order"
Router.post("/place", fetchUser, async (req, res) => {
  try {
    const code = uniqueCode();

    // const product = await Product.findById(req.body.productId);
    const buyer = await Buyer.findById(req.user.id);

    if (!buyer) {
      return res.status(404).json({ error: "Buyer not found" });
    }
    let bCity = buyer.city;
    let bState = buyer.state;
    let bPin = buyer.pin;
    let bPhno = buyer.phno;
    let bName = buyer.name;
    if (req.body.address === "new") {
      bCity = req.body.city;
      bState = req.body.state;
      bPin = req.body.pin;
      bPhno = req.body.PHno;
      bName = req.body.name;
    }

    const products = req.body.products;

    for (const product of products) {
      const farmer = await Farmer.findById(product.farmer_id);
      if (!farmer) {
        return res.status(404).json({ error: "Farmer not found" });
      }
      const fCity = farmer.city;
      const fState = farmer.state;
      const fPin = farmer.pin;

      const newOrder = {
        OTP: code,
        deliver: false,
        buyer_id: req.user.id,
        buyer_name: bName,
        buyer_ph: bPhno,
        buyer_address: {
          city: bCity,
          state: bState,
          pin: bPin,
        },
        farmer_name: farmer.name,
        farmer_ph: farmer.phno,
        farmer_id: product.farmer_id,
        farmer_address: {
          city: fCity,
          state: fState,
          pin: fPin,
        },
        image: product.image,
        productId: product.productId,
        productName: product.productName,
        price: product.price,
        quantity: product.quantity,
        shipping: product.shipping,
        description: product.description,
        payment_method: req.body.payment_method,
        status: "pending",
      };

      await Product.findByIdAndUpdate(product.productId, {
        $inc: { CurQuantity: -product.quantity }, // Decrement the CurQuantity by the ordered quantity
      });

      const order = await Order.create(newOrder);

      await Buyer.findByIdAndUpdate(req.user.id, {
        $push: { order: order._id },
      });

      await Farmer.findByIdAndUpdate(product.farmer_id, {
        $push: { orders: order._id },
      });
    }

    // Empty the cart
    await Buyer.findByIdAndUpdate(req.user.id, { cart: [] });

    res.status(201).json({
      success: true,
      OTP: code,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

const uniqueCode = () => {
  let code = "";
  const characters = "0123456789"; // Include desired characters

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }

  return code;
};

module.exports = Router;
