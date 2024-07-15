const studentModel = require("../models/student.model");
const getLandingPage = (req, res) => {
  res.render("index");
};

const submitStudent = (req, res) => {
  const student = req.body;
  console.log(student);
  if (student.age < 18) {
    res.send("Student too young");
  }
  const data = new studentModel(student);
  data
    .save()
    .then((saved) => {
      console.log("Data saved successfully", saved);
      res.redirect("/students");
    })
    .catch((err) => {
      console.log(err);
    });
};

const getAllStudents = async (req, res) => {
  // to get data from the database

  const studentData = await studentModel.find();

  // console.log(studentData);
  res.render("list", { studentList: studentData });
};

const getStudentsById = (req, res) => {
  const { id } = req.params;

  studentArray = studentArray.filter((item, index) => index != id);
  res.redirect("/students");

  // const array = studentArray.filter((item, index) => index != id);
  // res.render("list", { studentList: array });
};

const editStudent = async (req, res) => {
  const { index } = req.params;

  const selectedStudent = await studentModel.findOne({ _id: index });
  // const selectedStudent = studentArray[index];
  res.render("editPage", { student: selectedStudent, index: index });
};

const updateStudent = (req, res) => {
  const { index } = req.params;
  const data = req.body;
  studentArray[index].firstName = data.firstName;
  studentArray[index].lastName = data.lastName;
  studentArray[index].age = data.age;
  studentArray[index].gender = data.gender;
  studentArray[index].email = data.email;

  res.redirect("/students");
};
module.exports = {
  getLandingPage,
  submitStudent,
  getAllStudents,
  getStudentsById,
  editStudent,
  updateStudent,
};
