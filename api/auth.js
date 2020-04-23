const express = require("express");
const User = require("../schemas/User");
const { validateEmail } = require("../validations");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //Validate
    if (username === "" || email === "" || password === "") {
      return res.status(400).json({ msg: "Please provide all the fields." });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ msg: "Email is invalid." });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ msg: "Password must be at least 8 characters." });
    }
    const foundUser = await User.findOne({ email: email });
    if (foundUser) {
      return res.status(400).json({ msg: "User already exists" });
    }
    //Hass Pass
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create User
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    //Save User along with JWT
    await newUser.save();
    const token = jwt.sign(
      { id: newUser._id, username: newUser.username, email: newUser.email },
      process.env.JWT_SECRET
    );
    res.json({
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      token,
    });
  } catch {
    res.status(500).json({ msg: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //Validate
    if (email === "" || password === "") {
      return res.status(400).json({ msg: "Please provide all the fields." });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ msg: "Email is invalid." });
    }
    const foundUser = await User.findOne({ email: email });
    if (!foundUser) {
      return res.status(400).json({ msg: "User does not exist" });
    }
    const validPass = await bcrypt.compare(password, foundUser.password);
    if (!validPass) {
      return res.status(400).json({ msg: "Email or Password is wrong" });
    }
    const token = jwt.sign(
      {
        id: foundUser._id,
        username: foundUser.username,
        email: foundUser.email,
      },
      process.env.JWT_SECRET
    );
    res.json({
      id: foundUser._id,
      username: foundUser.username,
      email: foundUser.email,
      token,
    });
  } catch (err) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

// FOR TESTING
router.get("/users", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch {
    res.status(500).json({ msg: "Internal server error" });
  }
});
// FOR TESTING
router.delete("/delete/:id", async (req, res) => {
  try {
    const foundUser = await User.findOne({ _id: req.params.id });
    await foundUser.remove();
    res.json({ msg: "User removed" });
  } catch (err) {
    res.status(500).json({ msg: "Internal server error" });
  }
});
module.exports = router;
