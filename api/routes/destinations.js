const express = require("express");
const router = new express();
const multer = require("multer");
const authGuard = require("../middleware/authGuard");
const Destination = require("../models/Destination");
const upload = multer({ dest: __dirname + "/../temp/uploads/" });

router.get("/", async (req, res) => {
  const data = await Destination.find();

  res.json({ data });
});

router.get("/:id", async (req, res) => {
  const data = await Destination.findById(req.params.id).exec();

  res.json({ data });
});

router.post("/", upload.single("image"), async (req, res) => {
  const image = req.file || null;

  try {
    const destination = new Destination(req.body);
    await destination.save();
    res.json({ data: destination });
  } catch (e) {
    res.json({ errors: e.errors });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const destination = await Destination.findByIdAndUpdate(
      req.params.id,
      req.body
    ).exec();
    return res.json({ data: destination });
  } catch (e) {
    return res.json({ errors: e.errors });
  }
});

router.delete("/:id", authGuard, async (req, res) => {
  try {
    await Destination.findByIdAndDelete(req.params.id).exec();
  } catch (e) {
    // do nothing with the error
  }

  res.json({});
});

module.exports = router;
