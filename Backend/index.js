const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
connectToMongo();

const app = express();
app.use(cors());
app.use(express.json());

//Port No.
const port = process.env.PORT || 5000;
//Routes

//Authentication
app.use("/api/auth", require("./routes/auth"));

// Farmer
//Listing
app.use("/api/product", require("./routes/Farmer/listing.js"));

//Manage Product
 app.use("/api/inventory", require("./routes/Farmer/inventory.js"));

//Order Received
app.use("/api/orderReceived", require("./routes/Farmer/OrderReceived.js"));

// order_history
app.use("/api/order_history", require("./routes/Farmer/order_history.js"));

// Feedback
app.use("/api/feedback", require("./routes/Farmer/feedback.js"));

// Buyer
//View
app.use("/api/product", require("./routes/Buyer/View.js"));

//Cart (add & Get)
app.use("/api/cart", require("./routes/Buyer/Cart.js"));

//Place Order
app.use("/api/order", require("./routes/Buyer/PlaceOrder.js"));

//MyOrder
app.use("/api/myOrder", require("./routes/Buyer/MyOrder.js"));

//OrderHistory
app.use("/api/history", require("./routes/Buyer/OrderHistory.js"));

//ADD Review
app.use("/api/review", require("./routes/Buyer/AddReview.js"));

// Show Reviews
app.use("/api/review", require("./routes/Buyer/Review.js"));

// Product
// ProductDetails
app.use("/api/product", require("./routes/Product/Details.js"));

//feedback
app.use("/api/product", require("./routes/Product/Feedbacks.js"));

//SearchBar
app.use("/api/search", require("./routes/SearchBar/search.js"));

//UPDATE
//Profile
app.use("/api/update", require("./routes/Update/profile.js"));

//Listen
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
