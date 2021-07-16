var express = require("express");
var app = express();
var MongoClient = require("mongodb").MongoClient;

var url = "mongodb://mongo:27017/dockerdemo";
var db;

MongoClient.connect(url, function (err, database) {
  if (err) {
    console.log("failed to connect: " + err);
    return;
    db = database;
    console.log("Connected correctly to server!!");
  }
});

app.get("/", function (req, res) {
  res.send("Greetings from the server!!");
});

app.get("/createMongo", function (req, res) {
  var name = "user" + Math.floor(Math.random() * 10000);
  var email = name + "@mit.edu";

  var collection = db.collection("customers");
  var doc = { name: name, email: email };
  collection.insert(doc, { w: 1 }, function (err, result) {
    console.dir(result);
    res.send(result);
  });
});

// Simple datestamp response for functionality testing

// app.get("/", function (req, res) {
//   console.log(new Date().toLocaleString());
//   res.send(new Date().toLocaleString());
// });

var port = 3000;
app.listen(port, function () {
  console.log("Listening on port: " + port);
});
