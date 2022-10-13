const { compare } = require("bcrypt");
const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter a valid email address"],
      unique: [true, "The email is already used"],
    },
    passwordDigest: { type: String, required: true },
    createdAt: { type: Date, required: true, default: () => new Date() },
    upatedAt: { type: Date, required: true, default: () => new Date() },
  },
  {
    methods: {
      authenticate(password) {
        return compare(password, this.passwordDigest);
      },
    },
  }
);

module.exports = model("User", schema);
