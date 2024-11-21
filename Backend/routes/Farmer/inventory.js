const express = require("express");
const router = express.Router();
const Farmer = require("../../models/Farmer.js");
const Product = require("../../models/Products.js");
const fetchUser = require("../../middleware/fetchUserr.js");

// ROUTE 1: Show INVENTORY to the farmer:GET "/api/inventory/show".
router.get("/show", fetchUser, async (req, res) => {
  try {
    const farmer = await Farmer.findById(req.user.id);
    const productId = farmer.products;
    const products = [];
    for (let i = 0; i < productId.length; i++) {
      const product = await Product.findById(productId[i]);
      products.push(product);
    }

    // Send success response
    res.status(201).json({
      success: true,
      product: products,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// ROUTE 2: Delete Product from the  inventory
router.delete("/removeOne/:index", fetchUser, async (req, res) => {
  try {
    const farmer = await Farmer.findById(req.user.id);
    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    const index = req.params.index;
    if (index < 0 || index >= farmer.products.length) {
      return res.status(400).json({ message: "Invalid index" });
    }

    const productId = farmer.products[index];
    await Product.findByIdAndDelete(productId);

    // Remove the product ID from the farmer's products array
    farmer.products.splice(index, 1);
    await farmer.save();

    const productsId = farmer.products;
    const products = [];
    for (let i = 0; i < productsId.length; i++) {
      const product = await Product.findById(productsId[i]);
      products.push(product);
    }

    res.status(200).json({
      success: true,
      product: products,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// ROUTE 3: Delete entire Inventory DELETE "/api/inventory/empty".
router.delete("/empty", fetchUser, async (req, res) => {
  try {
    const farmer = await Farmer.findById(req.user.id);
    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    const productIds = farmer.products;
    for (let i = 0; i < productIds.length; i++) {
      await Product.findByIdAndDelete(productIds[i]);
    }

    // Empty the farmer's products array
    farmer.products = [];
    await farmer.save();

    // Send success response
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// ROUTE 4: Add stock in a product through the inventory POST "/api/inventory/addStock".

router.post("/addStock", fetchUser, async (req, res) => {
  try {
    const response = await Product.findByIdAndUpdate(req.body.id, {
      $inc: {
        AloQuantity: req.body.quantity,
        CurQuantity: req.body.quantity,
      },
    });
    if (!response) {
      // If response is null, product with given ID was not found
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// ROUTE 5: Change Price in a product through the inventory POST "/api/inventory/changePrice".

router.post("/changePrice", fetchUser, async (req, res) => {
  try {
    const response = await Product.findByIdAndUpdate(req.body.id, {
      price: req.body.price,
    });
    if (!response) {
      // If response is null, product with given ID was not found
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// ROUTE 4: Add stock in a product through the inventory POST "/api/inventory/addStock".

router.post("/removeStock", fetchUser, async (req, res) => {
  try {
    const response = await Product.findByIdAndUpdate(req.body.id, {
      $inc: {
        AloQuantity: -req.body.quantity,
        CurQuantity: -req.body.quantity,
      },
    });
    if (!response) {
      // If response is null, product with given ID was not found
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
module.exports = router;
