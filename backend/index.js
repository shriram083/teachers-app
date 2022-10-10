const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { userRoute } = require("./controllers/userController");
const { connection } = require("./config/db");
const { notesRoute } = require("./controllers/notesController");
const { studentRoute } = require("./controllers/studentCcontroller");
const { testRoute } = require("./controllers/testController");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Teacher Test Management App API");
});

app.use("/user", userRoute);

app.use("/notes", notesRoute);

app.use("/students", studentRoute);

app.use("/tests", testRoute);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch {
    console.log("Failed to connect DB");
  }
  console.log(`Listening on localhost:${process.env.PORT}`);
});
