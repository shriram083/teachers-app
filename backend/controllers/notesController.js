const express = require("express");

const { authentication } = require("../middlewares/authentication");
const { notesModel } = require("../models/notesModel");

const notesRoute = express.Router();

notesRoute.get("/", authentication, async (req, res) => {
  const { user } = req.body;
  try {
    const data = await notesModel.find({ user });
    res.send(data);
  } catch {
    res.send("Something Went Wrong");
  }
});

notesRoute.get("/:id", authentication, async (req, res) => {
  const { user } = req.body;
  const { id } = req.params;
  try {
    const data = await notesModel.findOne({ _id: id });
    res.send(data);
  } catch {
    res.send("Something Went Wrong");
  }
});

notesRoute.post("/create", authentication, async (req, res) => {
  const { title, note, label, user } = req.body;

  const newNote = new notesModel({
    title,
    note,
    label,
    user,
  });

  try {
    await newNote.save();
    res.send(`Note : ${newNote} saved successfully`);
  } catch {
    res.send("Something went wrong");
  }
});

notesRoute.patch("/:noteId", authentication, async (req, res) => {
  const { title, note, label, user } = req.body;
  const { noteId } = req.params;

  try {
    const data = {};
    if (title) {
      data.title = title;
    }
    if (note) {
      data.note = note;
    }
    if (label) {
      data.label = label;
    }
    await notesModel.updateOne({ _id: noteId }, data);
    res.send("Updated Successfully");
  } catch {
    res.send("Something Went Wrong");
  }
});

notesRoute.delete("/:noteId", authentication, async (req, res) => {
  const { noteId } = req.params;

  try {
    await notesModel.deleteOne({ _id: noteId });
    res.send("Deleted Successfully");
  } catch {
    res.send("Something Went Wrong");
  }
});

module.exports = { notesRoute };
