const express = require("express");
const { sign } = require("jsonwebtoken");
const { hashPassword } = require("../lib/helpers");
const User = require("../models/User");
const router = new express();

router.post("/register", async (req, res) => {
  const { email, password, password_confirmation } = req.body;

  if (password != password_confirmation) {
    return res.json({ error: "Passwords do not match" });
  }

  const passwordDigest = await hashPassword(password);

  try {
    const user = new User({ email, passwordDigest });
    await user.save();

    return res.json({ data: user });
  } catch (e) {
    return res.json({ error: "An error occurred" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).exec();

  if (!user) {
    return res.json({ error: "Invalid credentials" });
  }

  if (await user.authenticate(password)) {
    const token = sign(
      {
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1),
      },
      process.env.JWT_SECRET
    );
    return res.json({
      data: {
        token,
        user: { email: user.email },
      },
    });
  } else {
    return res.json({ error: "Invalid credentials" });
  }
});

module.exports = router;
