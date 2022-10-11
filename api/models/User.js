const { Schema, model } = require("mongoose");

const schema = new Schema({
  name: String,
  email: String,
  passwordDigest: String,
  createdAt: Date,
  upatedAt: Date,
});

module.exports = model("User", schema);
