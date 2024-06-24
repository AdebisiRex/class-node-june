const express = require("express");
const app = express();
const PORT = 2349;
app.use(express.urlencoded());
app.set("view engine", "ejs");

const studentArray = [];
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/submit", (req, res) => {
  const student = req.body;
  if (student.age < 18) {
    res.send("Student too young");
  }
  studentArray.push(student);
  console.log(studentArray)
  res.redirect("/students");
});

app.get("/students", (req, res) => {
  res.render("list", { studentList: studentArray });
});

app.listen(PORT, function () {
  console.log("App started at PORT:" + PORT);
});
