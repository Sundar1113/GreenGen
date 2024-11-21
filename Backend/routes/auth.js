const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Farmer = require("../models/Farmer.js");
const Buyer = require("../models/Buyer.js");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUserr");
const JWT_SECRET = "Sunitisagoodbo$y";

const validStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep",
  "Delhi",
  "Puducherry",
];

// ROUTE 1: Create a User using:POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("email", "email").isEmail(),
    body("name", "name").isLength({ min: 3 }),
    body("password", "password").isLength({
      min: 5,
    }),
    body("pin", "pin").matches(/^\d{6}$/),
    body("state", "state").isIn(validStates),
    body("phno", "phno").matches(/^\d{10}$/),
  ],
  async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstError = errors.array()[0];
      return res.status(400).json({ error: firstError.msg });
    }
    //Check weather the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.json("Exist");
      }
      const salt = await bcrypt.genSalt(10);
      secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
        role: req.body.role,
        pin: req.body.pin,
        city: req.body.city,
        state: req.body.state,
        phno: req.body.phno,
      });
      if (req.body.role == "farmer") {
        await Farmer.create({
          _id: user._id,
          name: req.body.name,
          email: req.body.email,
          pin: req.body.pin,
          city: req.body.city,
          state: req.body.state,
          phno: req.body.phno,
        });
      } else if (req.body.role == "buyer") {
        await Buyer.create({
          _id: user._id,
          name: req.body.name,
          email: req.body.email,
          pin: req.body.pin,
          city: req.body.city,
          state: req.body.state,
          phno: req.body.phno,
        });
      }
      const data = {
        id: user.id,
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      const role = req.body.role;
      success = true;
      res.json({ success, authtoken, role });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// ROUTE 2: Authenticate a User using:POST "/api/auth/login". Login required
router.post(
  "/login",
  [
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      const payload = { id: user.id };
      const authtoken = jwt.sign(payload, JWT_SECRET);
      res.json({ success: true, authtoken, role: user.role });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// ROUTE 3: Authenticate a User using:POST "/api/auth/getUser". Login required
router.post("/getUser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
