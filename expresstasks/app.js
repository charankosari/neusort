const express = require("express");
const connectDB = require("./config/db");
const logger = require("./middlewares/logger");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

const app = express();

// Connect to the database
connectDB();

// Middleware for logging requests
app.use(logger);

// Middleware to parse JSON
app.use(express.json());

// Serve static assets
app.use(express.static("public"));

// Define routes
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

module.exports = app;
