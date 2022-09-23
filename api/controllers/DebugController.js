const Destinations = require("../repos/Destinations");

module.exports = {
  async debug(req, res) {
    const cursor = await Destinations.find();
    const destinations = await cursor.toArray();

    res.json(destinations);
  },
};
