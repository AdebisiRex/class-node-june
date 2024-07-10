const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 2349;
app.use(express.urlencoded());
app.set("view engine", "ejs");

const MONGO_URI =
  "mongodb+srv://sqi-abeokuta:SQICollegeOfICT@atlascluster.vbdzuw6.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Mongo DB Connected Successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });

const studentSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  gender: String,
  age: Number,
});

const studentModel = mongoose.model("students", studentSchema);

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/submit", (req, res) => {
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
});

app.get("/students", async (req, res) => {
  // to get data from the database

  const studentData = await studentModel.find();

  // console.log(studentData);
  res.render("list", { studentList: studentData });
});

app.post("/student/:id", (req, res) => {
  const { id } = req.params;

  studentArray = studentArray.filter((item, index) => index != id);
  res.redirect("/students");

  // const array = studentArray.filter((item, index) => index != id);
  // res.render("list", { studentList: array });
});

app.get("/editPage/:index", async (req, res) => {
  const { index } = req.params;

  const selectedStudent = await studentModel.findOne({ _id: index });
  // const selectedStudent = studentArray[index];
  res.render("editPage", { student: selectedStudent, index: index });
});

app.post("/updateUser/:index", (req, res) => {
  const { index } = req.params;
  const data = req.body;
  studentArray[index].firstName = data.firstName;
  studentArray[index].lastName = data.lastName;
  studentArray[index].age = data.age;
  studentArray[index].gender = data.gender;
  studentArray[index].email = data.email;

  res.redirect("/students");
});
app.listen(PORT, function () {
  console.log("App started at PORT:" + PORT);
});
