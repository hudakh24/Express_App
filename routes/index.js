// var express = require("express");
// var router = express.Router();

// /* GET home page. */
// router.get("/", function (req, res, next) {
//   res.send("My First express app");
// });
var routes = require("express").Router();
routes.get("/get-home", (req, res) => {
  return res.send("Welcome to home");
});

module.exports = routes;
