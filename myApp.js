require("dotenv").config();
var bodyParser = require("body-parser");
var express = require("express");
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// console.log("Hello World");
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/name", function (req, res) {
  // Handle the data in the request
  var name = req.body.first + " " + req.body.last;
  res.json({ name: name });
});

app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.send({ time: req.time });
  }
);

app.get("/name", function (req, res) {
  var firstName = req.query.first;
  var lastName = req.query.last;
  res.json({
    name: `${firstName} ${lastName}`,
  });
});

app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({
    echo: word,
  });
});

app.use(function middleware(req, res, next) {
  var string = req.method + " " + req.path + " - " + req.ip;
  console.log(string);
  next();
});
app.use("/public", express.static(__dirname + "/public"));

app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ message: "HELLO JSON" });
  } else {
    res.json({ message: "Hello json" });
  }
});

module.exports = app;
