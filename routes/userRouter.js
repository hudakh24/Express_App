var routes = require("express").Router();
const { create, getAll } = require("../controllers/userController");
const { CreateUserSchema } = require("../validations/users");
routes.post("/create-user", CreateUserSchema, create); //middle ware due which next is used i-e it will move to create when validation is done
routes.get("/get-all-user", getAll);

module.exports = routes;
