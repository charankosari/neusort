const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Get products by category
router.get("/:category", async (req, res) => {
  const { category } = req.params;
  try {
    const products = await Product.find({ category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get product details by ID
router.get("/product/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (product) res.json(product);
    else res.status(404).json({ error: "Product not found" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
