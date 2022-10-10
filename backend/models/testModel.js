const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  marks: { type: String, required: true },
  date: { type: String, required: true },
  student_id: { type: String, required: true },
});

const testModel = mongoose.model("eval", testSchema);

module.exports = { testModel };
