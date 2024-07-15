const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  gender: String,
  age: Number,
});

const studentModel = mongoose.model("students", studentSchema);

module.exports = studentModel;
