const express = require("express");
const router = express.Router();

const {
  getLandingPage,
  submitStudent,
  getAllStudents,
  getStudentsById,
  editStudent,
  updateStudent,
} = require("../controllers/student.controller");

router.get("/", getLandingPage);

router.post("/submit", submitStudent);

router.get("/students", getAllStudents);

router.post("/student/:id", getStudentsById);

router.get("/editPage/:index", editStudent);

router.post("/updateUser/:index", updateStudent);

module.exports = router;

//Don't Repeat yourself
