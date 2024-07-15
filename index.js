const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.urlencoded());
app.set("view engine", "ejs");
const studentRouter = require("./routes/student.route");

require("dotenv").config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Mongo DB Connected Successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/", studentRouter);

app.listen(PORT, function () {
  console.log("App started at PORT:" + PORT);
});
