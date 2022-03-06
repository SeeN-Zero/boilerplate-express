var express = require("express");
var app = express();

// console.log("Hello World");
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/json", (req, res) => {
  if (process.env.VAR_NAME === "uppercase") {
    response = "Hello World".toUpperCase();
  } else {
    response = "Hello World";
  }
});

module.exports = app;
