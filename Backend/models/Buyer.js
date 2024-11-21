const mongoose = require("mongoose");
const { Schema } = mongoose;

const BuyerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phno: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pin: {
    type: Number,
    required: true,
  },
  cart: [],
  order: [],
  orderHistory: [],
  review: [],
});
const Buyer = mongoose.model("buyer", BuyerSchema);
module.exports = Buyer;
