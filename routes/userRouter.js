var routes = require("express").Router();
const {
  create,
  getAll,
  getUser,
  deleteUser,
} = require("../controllers/userController");
const {
  CreateUserSchema,
  user_by_name,
  DeleteUserName,
} = require("../validations/users");
routes.post("/create-user", CreateUserSchema, create); //middle ware due which next is used i-e it will move to create when validation is done
routes.get("/get-all-user", getAll);
routes.get("/get-by-username", user_by_name, getUser);
routes.delete("/deleteuser", DeleteUserName, deleteUser);

module.exports = routes;
