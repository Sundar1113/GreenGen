const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema({
  OTP: {
    type: String,
    required: true,
  },

  deliver: {
    type: Boolean,
    default: false,
  },
  farmer_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  buyer_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  buyer_name: { type: String, required: true },
  buyer_ph: { type: Number, required: true },
  buyer_address: {
    city: String,
    state: String,
    pin: String,
  },
  farmer_name: { type: String, required: true },
  farmer_ph: { type: Number, required: true },
  farmer_address: {
    city: String,
    state: String,
    pin: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },

  //Product details
  image: { type: String },
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Products",
    required: true,
  },
  productName: { type: String, required: true },
  price: {
    type: Number,
    required: true,
  },
  quantity: { type: String, required: true },
  description: { type: String, required: true },
  shipping: { type: Boolean },
  feedback_done: { type: Boolean, default: false },

  //Order Status
  payment_method: { type: String },
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "canceled"],
    default: "pending",
  },
  delivery_date: Date,
});
const Order = mongoose.model("order", OrderSchema);
module.exports = Order;
