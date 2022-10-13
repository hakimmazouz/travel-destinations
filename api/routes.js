const express = require("express");
const debug = require("./routes/debug");
const auth = require("./routes/auth");
const destinations = require("./routes/destinations");
const routes = new express();

routes.use("/destinations", destinations);
routes.use("/auth", auth);

routes.get("/debug", debug.debug);

routes.get("*", function (req, res) {
  res.status(404).json({
    message: "No such resource or method",
  }); // <== YOUR JSON DATA HERE
});

routes.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({
    message: "An error occurred",
  });
});

module.exports = routes;
