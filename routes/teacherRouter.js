var routes = require("express").Router();
const { create, getAll, deleteUser } = require("../controllers/user");
const { CreateUserSchema } = require("../validations/users");
routes.post("/create-teacher", CreateUserSchema, create); //middle ware due which next is used i-e it will move to create when validation is done
routes.get("/get-all-teachers", getAll);
routes.delete("/delete-teacher", deleteUser);

module.exports = routes;
