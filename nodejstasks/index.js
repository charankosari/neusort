// Calculation of  total price of items in a shopping cart
function calculateTotalPrice(cartItems) {
  return cartItems.reduce((total, item) => {
    let discount = item.discount || 0;
    let priceAfterDiscount = item.price - item.price * (discount / 100);
    return total + priceAfterDiscount * item.quantity;
  }, 0);
}
//  unique order numbers for each purchase.
const crypto = require("crypto");

function generateOrderNumber() {
  return "ORD-" + crypto.randomBytes(8).toString("hex");
}

//Module to interact with a database
const { MongoClient } = require("mongodb");

class Database {
  constructor(url, dbName) {
    this.url = url;
    this.dbName = dbName;
  }

  async connect() {
    if (!this.client) {
      this.client = new MongoClient(this.url);
      this.db = await this.client.db(this.dbName);
    }
    return this.db;
  }

  async insert(collection, data) {
    const db = await this.connect();
    return db.collection(collection).insertOne(data);
  }

  async find(collection, query) {
    const db = await this.connect();
    return db.collection(collection).find(query).toArray();
  }

  async close() {
    await this.client.close();
  }
}

module.exports = Database;

//Validate user input
function validateUserInput(user) {
  const errors = [];
  if (!user.username || user.username.length < 3)
    errors.push("Username must be at least 3 characters.");
  if (!user.email || !/\S+@\S+\.\S+/.test(user.email))
    errors.push("Invalid email.");
  if (!user.password || user.password.length < 6)
    errors.push("Password must be at least 6 characters.");
  return errors.length > 0 ? errors : null;
}

//express session

const session = require("express-session");

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }, // Session expires in 1 hour
  })
);

// send email

const nodemailer = require("nodemailer");

async function sendOrderEmail(userEmail, orderDetails) {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "shivacharankosari099@gmail.com",
      pass: "your-password",
    },
  });

  let info = await transporter.sendMail({
    from: '"Shop" <shop@gmail.com>',
    to: userEmail,
    subject: "Order Confirmation",
    text: `Thank you for your order! Your order details: ${orderDetails}`,
  });

  return info;
}

// Read and process data
const fs = require("fs");
const path = require("path");

function readConfig(filePath) {
  const configPath = path.resolve(filePath);
  if (fs.existsSync(configPath)) {
    const configData = fs.readFileSync(configPath, "utf8");
    return JSON.parse(configData);
  } else {
    throw new Error("Configuration file not found");
  }
}
// Handling asynchronous operations
async function handleAsyncOperation(promise) {
  try {
    const result = await promise;
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
// Log errors and exceptions
const fs = require("fs");
const path = require("path");

function logError(error) {
  const logPath = path.resolve("error.log");
  const errorMessage = `${new Date().toISOString()} - ${error.stack}\n`;
  fs.appendFileSync(logPath, errorMessage);
}

process.on("uncaughtException", (error) => {
  logError(error);
});
// Format dates and times
function formatDateTime(date, locale = "en-US") {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(new Date(date));
}
