const express = require("express");

const { authentication } = require("../middlewares/authentication");
const { studentModel } = require("../models/studentsModel");

const studentRoute = express.Router();

studentRoute.get("/", authentication, async (req, res) => {
  const { user } = req.body;
  try {
    const data = await studentModel.find().sort({ age: 1 });
    res.send(data);
  } catch {
    res.send("Something Went Wrong");
  }
});

studentRoute.get("/:id", authentication, async (req, res) => {
  const { user } = req.body;
  const { id } = req.params;
  try {
    const data = await studentModel.findOne({ _id: id });
    res.send(data);
  } catch {
    res.send("Something Went Wrong");
  }
});

studentRoute.post("/create", authentication, async (req, res) => {
  const { name, gender, age, profile_pic } = req.body;

  const newStudent = new studentModel({
    name,
    gender,
    age,
    profile_pic,
  });

  try {
    await newStudent.save();
    res.send(`New Student : ${newStudent} saved successfully`);
  } catch {
    res.send("Something went wrong");
  }
});

// studentRoute.delete("/:id", authentication, async (req, res) => {
//   const { id } = req.params;

//   try {
//     await studentModel.deleteOne({ _id: id });
//     res.send("Deleted Successfully");
//   } catch {
//     res.send("Something Went Wrong");
//   }
// });

module.exports = { studentRoute };
