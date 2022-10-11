const { Schema, model } = require("mongoose");

const schema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  country: { type: String, required: true },
  // user_id: { type: String, required: true },
  createdAt: { type: Date, required: true, default: () => new Date() },
  upatedAt: { type: Date, required: true, default: () => new Date() },
});

module.exports = model("Destination", schema);
