const mongoose = require("mongoose");
const { Schema } = mongoose;

const FarmerSchema = new Schema({
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
  products: [],
  orders: [],
  orderHistory: [],
  feedback: [],
});
const Farmer = mongoose.model("farmer", FarmerSchema);
module.exports = Farmer;
