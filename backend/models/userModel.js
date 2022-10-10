const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  user_name: { type: String, required: true },
});

const userModel = mongoose.model("user", userSchema);

module.exports = { userModel };
