var routes = require("express").Router();
const {
  create,
  getAll,
  getuser,
  deleteuser,
} = require("../controllers/userController");
const {
  CreateUserSchema,
  user_by_name,
  deleteusername,
} = require("../validations/users");
routes.post("/create-user", CreateUserSchema, create); //middle ware due which next is used i-e it will move to create when validation is done
routes.get("/get-all-user", getAll);
routes.get("/get-by-username", user_by_name, getuser);
routes.delete("/deleteuser", deleteusername, deleteuser);

module.exports = routes;
