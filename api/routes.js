const express = require("express");
const DebugController = require("./controllers/DebugController");
const DestinationsController = require("./controllers/DestinationsController");
const routes = new express();

routes.use(DestinationsController);

routes.get("/debug", DebugController.debug);

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
