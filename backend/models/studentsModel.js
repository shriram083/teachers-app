const mongoose = require("mongoose");

const studentsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: String, required: true },
  profile_pic: { type: String, required: true },
});

const studentModel = mongoose.model("student", studentsSchema);

module.exports = { studentModel };
