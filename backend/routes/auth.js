const express = require("express");
const router = express.Router();
const users = require("../data/users");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post("/login", (req, res) => {
  const { email, password } = req.body || {};

  // --- Server-side validation (never trust the client) ---
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are both required.",
    });
  }

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address.",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters long.",
    });
  }

  // --- Mock authentication ---
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );

  if (!user || user.password !== password) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password.",
    });
  }

  // In a real app you'd issue a signed JWT or session cookie here.
  const fakeToken = Buffer.from(`${user.id}:${Date.now()}`).toString(
    "base64"
  );

  return res.status(200).json({
    success: true,
    message: `Welcome back, ${user.name}!`,
    token: fakeToken,
    user: { id: user.id, name: user.name, email: user.email },
  });
});

module.exports = router;
