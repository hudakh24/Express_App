var routes = require("express").Router();
const {
  create,
  getAll,
  getUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController");
const {
  CreateUserSchema,
  UserByName,
  DeleteUserName,
  UpdateTheUser,
} = require("../validations/users");
routes.post("/create-user", CreateUserSchema, create); //middle ware due which next is used i-e it will move to create when validation is done
routes.get("/get-all-user", getAll);
routes.get("/get-by-username", UserByName, getUser);
routes.delete("/delete-user", DeleteUserName, deleteUser);
routes.patch("/update-user", UpdateTheUser, updateUser);

module.exports = routes;
