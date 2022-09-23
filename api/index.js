require("dotenv").config();

const express = require("express");
const apiRoutes = require("./routes");
const app = new express();
const morgan = require("morgan");

app.use(morgan("tiny"));
app.use(express.json());
app.use("/api/v1", apiRoutes);

app.listen(process.env.API_EXPRESS_PORT, (err) => {
  if (err) {
    console.log("Error in server setup");
    app.close();
  }
  console.log("API listening on port ", process.env.API_EXPRESS_PORT);
});
