const mongoose = require("mongoose");

const EmployeeShcema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  salary: String,
  picture: String,
  position: String,
});

mongoose.model("Employee", EmployeeShcema);
