var routes = require("express").Router();
const { login, logout } = require("../controllers/authController");
const { LoginUserSchema } = require("../validations/login");
const { LogoutUserSchema } = require("../validations/logout");

routes.post("/login-user", LoginUserSchema, login);
routes.delete("/logout-user", LogoutUserSchema, logout);

module.exports = routes;
