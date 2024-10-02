const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authenticate = require("../middlewares/authenticate");

// Update user profile
router.put("/profile/update", async (req, res) => {
  const { name, email, id } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { name, email },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get user order history (assuming an Order model exists)
router.get("/order-history/:id", async (req, res) => {
  try {
    // Fetch order history from Order model
    const id = req.params.id;
    const orders = await Order.find({ userId: id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
