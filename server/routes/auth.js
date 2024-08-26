const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// 회원가입
router.post("/register", async (req, res) => {
  const { username, password, role } = req.body;

  const hashPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    password: hashPassword,
    role,
  });

  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Username already exists" });
    }
    res.status(400).json({ message: err.message });
  }
});

// 로그인
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const findUser = await User.findOne({ username });
  if (!findUser) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, findUser.password);
  if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

  const token = jwt.sign(
    { id: findUser._id, role: findUser._role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

module.exports = router;
