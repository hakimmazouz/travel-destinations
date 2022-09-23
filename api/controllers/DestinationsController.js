const {
  prepareForInsert,
  validateDestinationUpdate,
} = require("../lib/destinations");
const { validatePresence } = require("../lib/validator");
const Destinations = require("../repos/Destinations");
const express = require("express");
const router = new express();
const multer = require("multer");
const { ObjectId } = require("mongodb");
const upload = multer({ dest: __dirname + "/../temp/uploads/" });

router.get("/destinations", async (req, res) => {
  const data = await Destinations.find().toArray();

  res.json({ data });
});

router.get("/destinations/:id", async (req, res) => {
  const data = await Destinations.findOne({
    _id: new ObjectId(req.params.id),
  });

  console.log(data);

  res.json({ data });
});

router.post("/destinations", upload.single("image"), async (req, res) => {
  const image = req.file || null;
  const destinationData = prepareForInsert({ ...res.body, image });
  const destination = await Destinations.insertOne(destinationData);

  res.json(destination);
});

router.patch("/destinations/:id", async (req, res) => {
  console.log(req.body);
  const { updated, errors } = validateDestinationUpdate(req.body);

  if (errors) return res.json({ errors });

  const { ok } = await Destinations.findOneAndUpdate(
    { _id: new ObjectId(req.params.id) },
    {
      $set: updated,
    }
  );

  if (ok) {
    const updatedDoc = await Destinations.findOne({
      _id: ObjectId(req.params.id),
    });

    return res.json({ data: updatedDoc });
  } else {
    return res.json({
      errors: {
        General: "An error occured",
      },
    });
  }
});

router.delete("/destinations/:id", async (req, res) => {
  await Destinations.findOneAndDelete({
    _id: new ObjectId(req.params.id),
  });

  res.status(200);
});

module.exports = router;
