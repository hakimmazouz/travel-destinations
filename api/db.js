const mongoose = require("mongoose");

exports.connectDB = async () =>
  await mongoose.connect(process.env.MONGODB_CONNECTION_URI);
