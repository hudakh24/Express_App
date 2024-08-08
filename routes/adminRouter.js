var routes = require("express").Router();
const { create, getAll, deleteUser } = require("../controllers/user");
const { CreateUserSchema } = require("../validations/users");
routes.post("/create-admin", CreateUserSchema, create); //middle ware due which next is used i-e it will move to create when validation is done
routes.get("/get-all-admins", getAll);
routes.delete("/delete-admin", deleteUser);

module.exports = routes;
