import React from "react";

import Navbar from "./components/Navbar/nav.jsx";
import Navbar2 from "./components/Navbar/nav2.jsx";
import Footer from "./components/footer.jsx";
import Home from "./components/home.jsx";
import Login from "./components/login.jsx";
import Signup from "./components/signup";
import ContactUs from "./components/contact_us";
import About from "./components/about";
import FarmerDashboard from "./components/Dashboard/Farmer/main.jsx";
import BuyerDashboard from "./components/Dashboard/Buyer/main.jsx";
import Cart from "./components/cart/cart.jsx";
import Checkout from "./components/checkout/check.jsx";
import Detail from "./components/Details/details.jsx";
import AddReview from "./components/addReview/addReview.jsx";
import Payment from "./components/payment/payment.jsx";

import "./App.css";

import {
  BrowserRouter as Router,
  // Switch,
  Route,
  // Link,
  Routes,
} from "react-router-dom";
import { createContext } from "react";

const MyContext = createContext();

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <Footer />
            </>
          }
        />

        <Route
          path="/signup"
          element={
            <>
              <Navbar2 />
              <Signup />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Navbar2 />
              <Login />
              <Footer />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Navbar2 />
              <About />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Navbar2 />
              <ContactUs />
            </>
          }
        />

        <Route
          path="/farmerProfile"
          element={
            <>
              {/* <Navbar /> */}
              <FarmerDashboard />
            </>
          }
        />
        <Route
          path="/buyerProfile"
          element={
            <>
              {/* <Navbar /> */}
              <BuyerDashboard />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <Navbar2 />
              <Cart />
            </>
          }
        />
        <Route
          path="/checkout"
          element={
            <>
              <Navbar2 />
              <Checkout />
            </>
          }
        />
        <Route
          path="/details"
          element={
            <>
              <Navbar2 />
              <Detail />
            </>
          }
        />
        <Route
          path="/addReview"
          element={
            <>
              <Navbar />
              <AddReview />
            </>
          }
        />
        <Route
          path="/payment"
          element={
            <>
              <Navbar />
              <Payment />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

export { MyContext };
