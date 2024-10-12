const express = require("express");
const mongoose = require("mongoose");
const taskRoutes = require("./routes/taskRouts");
require("dotenv").config();
const app = express();
//connect to DB.........
const pass = process.env.PASSWORD;
const db = process.env.DATABASE.replace("<PASSWORD>", pass);
mongoose.connect(db).then(() => console.log("db connected😁"));
//middleware......
app.use(express.json());
// app.use(express.static("public"));
// app.set("view engine", "ejs");
// server configure ..........
app.use(taskRoutes);
app.listen(process.env.POTRT || 2000, () =>
  console.log("server started listening ")
);
