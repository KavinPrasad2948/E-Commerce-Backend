const express = require("express");
const jwt = require("jsonwebtoken");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

//* Database Connection
mongoose
  .connect(
    `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.sp536.mongodb.net/`
  )
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

//? User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

//! Creating Endpoint
app.post("/signup", async (req, res) => {
  try {
    let check = await User.findOne({ email: req.body.email });
    if (check) {
      return res.status(400).json({ message: "Email already exists" });
    }

    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password, // No hashing here
      cartData: cart,
    });
    await user.save();

    const data = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(data, "Ka_vin^$Pr@sa!d_-Secret", { expiresIn: '1h' });
    res.json({ token: token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Directly compare plaintext passwords
    if (req.body.password !== user.password) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const data = {
      user: {
        id: user.id,
      },
    };
    const token = jwt.sign(data, "Ka_vin^$Pr@sa!d_-Secret", { expiresIn: '1h' });
    res.json({ token: token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//? Middleware
const fetchUser = async (req, res, next) => {
  try {
    const token = req.header("auth_token");
    if (!token) {
      return res.status(401).json({ message: "Access denied" });
    }

    try {
      const data = jwt.verify(token, "Ka_vin^$Pr@sa!d_-Secret");
      req.user = data.user;
      next();
    } catch (error) {
      return res.status(403).json({ message: "Token is not valid" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

app.post("/addtocart", fetchUser, async (req, res) => {
  try {
    let userData = await User.findOne({ _id: req.user.id });
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    userData.cartData[req.body.itemId] += 1;
    await User.findOneAndUpdate(
      { _id: req.user.id },
      { cartData: userData.cartData }
    );

    res.json({ message: "Added to cart" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/deletefromcart", fetchUser, async (req, res) => {
  try {
    let userData = await User.findOne({ _id: req.user.id });
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    userData.cartData[req.body.itemId] += 1;
    await User.findOneAndDelete(
      { _id: req.user.id },
      { cartData: userData.cartData }
    );

    res.json({ message: "Removed from cart" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/getcartitems', fetchUser, async (req, res) => {
  try {
    let userData = await User.findOne({ _id: req.user.id });
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(userData.cartData);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});


//! API endpoint
app.get("/", async (req, res) => {
  try {
    res.status(200).send({ message: "Server is running" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
