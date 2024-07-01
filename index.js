const express = require("express");
const app = express();
const PORT = 2349;
app.use(express.urlencoded());
app.set("view engine", "ejs");

let studentArray = [];
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/submit", (req, res) => {
  const student = req.body;
  if (student.age < 18) {
    res.send("Student too young");
  }
  studentArray.push(student);
  // console.log(studentArray);
  res.redirect("/students");
});

app.get("/students", (req, res) => {
  res.render("list", { studentList: studentArray });
});

app.post("/student/:id", (req, res) => {
  const { id } = req.params;

  studentArray = studentArray.filter((item, index) => index != id);
  res.redirect("/students");

  // const array = studentArray.filter((item, index) => index != id);
  // res.render("list", { studentList: array });
});

app.get("/editPage/:index", (req, res) => {
  const { index } = req.params;
  const selectedStudent = studentArray[index];
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
