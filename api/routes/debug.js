const Destination = require("../models/Destination");

module.exports = {
  async debug(req, res) {
    const cursor = await Destination.find();
    const destinations = await cursor.toArray();

    res.json(destinations);
  },
};
