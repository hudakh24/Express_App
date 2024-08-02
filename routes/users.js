var express = require("express");
var router = express.Router();

// /* GET users listing. */
// router.get("/", function (req, res, next) {
//   res.send("respond with a resource");
// });
var routes = require("express").Router();
routes.get("/create", (req, res) => {
  return res.send("Create User API");
});

routes.get("/read", (req, res) => {
  return res.send("Read User API");
});

routes.get("/update", (req, res) => {
  return res.send("Update User API");
});

routes.get("/delete", (req, res) => {
  return res.send("Delete User API");
});

module.exports = routes;
