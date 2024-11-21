const mongoose = require("mongoose");
const { Schema } = mongoose;

const FeedbackSchema = new Schema({
  review: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  product_name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: { type: String, required: true },
});

const Feedback = mongoose.model("Feedback", FeedbackSchema);
module.exports = Feedback;
