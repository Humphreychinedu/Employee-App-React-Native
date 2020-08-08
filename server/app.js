const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require("./Employee");

app.use(bodyParser.json());

const Employee = mongoose.model("Employee");

// Mongo connection url
const connectionString =
  "mongodb+srv://EmpApp:BWffVlnlhLDsRtv6@empapp.fqpzh.mongodb.net/<dbname>?retryWrites=true&w=majority";

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongo successfully!");
});

mongoose.connection.on("error", (error) => {
  console.log("error!", error);
});

app.get("/", (req, res) => {
  res.send("Welcome to node js");
});

app.post("/create", (req, res) => {
  const _employee = new Employee({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    salary: req.body.salary,
    position: req.body.position,
    picture: req.body.picture,
  });
  _employee
    .save()
    .then((data) => {
      console.log(data);
      res.send("Success");
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen("3000", () => console.log("server running"));
