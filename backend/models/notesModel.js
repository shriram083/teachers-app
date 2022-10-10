const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  note: { type: String, required: true },
  label: { type: String, required: true },
  user: { type: String, required: true },
});

const notesModel = mongoose.model("note", notesSchema);

module.exports = { notesModel };
