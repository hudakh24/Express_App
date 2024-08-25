var routes = require("express").Router();
const protected = require("../middleware");
const {
  create,
  getAll,
  getUser,
  deleteUser,
  update,
  getProfile,
} = require("../controllers/userController");
const {
  CreateUserSchema,
  userSchema,
  updateTheUser,
  getAllUserSchema,
} = require("../validations/users");
routes.post("/create-user", CreateUserSchema, create); //middle ware due which next is used i-e it will move to create when validation is done
routes.get("/get-all-user", protected, getAllUserSchema, getAll);
routes.get("/get-user", userSchema, getUser);
routes.delete("/delete-user", userSchema, deleteUser);
routes.patch("/update-user", updateTheUser, update);
routes.get("/get-profile", protected, getProfile);
module.exports = routes;
