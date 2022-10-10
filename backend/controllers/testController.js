const express = require("express");

const { authentication } = require("../middlewares/authentication");
const { testModel } = require("../models/testModel");

const testRoute = express.Router();

testRoute.get("/:id", authentication, async (req, res) => {
  const { id } = req.params;
  try {
    const data = await testModel.find({ student_id: id });
    res.send(data);
  } catch {
    res.send("Something Went Wrong getting all tests");
  }
});

testRoute.get("/single/:id", authentication, async (req, res) => {
  const { user } = req.body;
  const { id } = req.params;
  try {
    const data = await testModel.findOne({ _id: id });
    res.send(data);
  } catch {
    res.send("Something Went Wrong in get ");
  }
});

testRoute.post("/create/:id", authentication, async (req, res) => {
  // console.log("inside create test");
  const { name, subject, marks, date } = req.body;
  const { id } = req.params;
  const newTest = new testModel({
    name,
    subject,
    marks,
    date,
    student_id: id,
  });

  try {
    await newTest.save();
    res.send(`New Test : ${newTest} saved successfully`);
  } catch {
    res.send("Something went wrong in Creating");
  }
});

testRoute.delete("/single/:id", authentication, async (req, res) => {
  const { id } = req.params;

  try {
    await testModel.deleteOne({ _id: id });
    res.send("Deleted Successfully");
  } catch {
    res.send("Something Went Wrong");
  }
});

testRoute.patch("/single/:testId", authentication, async (req, res) => {
  const { name, subject, marks, date } = req.body;
  const { testId } = req.params;

  try {
    const data = {};
    if (name) {
      data.name = name;
    }
    if (subject) {
      data.subject = subject;
    }
    if (marks) {
      data.marks = marks;
    }
    if (date) {
      data.date = date;
    }
    await testModel.updateOne({ _id: testId }, data);
    res.send("Updated Successfully");
  } catch {
    res.send("Something Went Wrong in patch");
  }
});

module.exports = { testRoute };
