const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { userModel } = require("../models/userModel");

const userRoute = express.Router();

userRoute.post("/signup", async (req, res) => {
  const { email, password, age, first_name, last_name, user_name } = req.body;

  const databaseUser = await userModel.findOne({ email });

  if (databaseUser) {
    return res.send(`User With ${email} is Already Exists`);
  }

  await bcrypt.hash(password, 8, async function (err, hash) {
    if (err) {
      return res.send("Please Try Again Later");
    }

    const user = new userModel({
      first_name,
      last_name,
      email,
      password: hash,
      age,
      user_name,
    });

    try {
      await user.save();
      res.send(`Account with email ${email} has been created successfully`);
    } catch {
      res.send("something went wrong");
    }
  });
});

userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const databaseUser = await userModel.findOne({ email });

  if (databaseUser == null) {
    return res.send("User Does Not Exists");
  }

  const hash = databaseUser.password;

  await bcrypt.compare(password, hash, async function (err, result) {
    if (err) {
      return res.send("Please try again");
    }
    if (result) {
      const token = jwt.sign(
        {
          email: databaseUser.email,
          age: databaseUser.age,
          id: databaseUser._id,
        },
        "secret"
      );

      return res.send({
        messege: `Login Success ${databaseUser.email}`,
        token,
        id: databaseUser._id,
        name: `${databaseUser.first_name} ${databaseUser.last_name}`,
      });
    }
    return res.send("Something Went Wrong");
  });
});

module.exports = { userRoute };
