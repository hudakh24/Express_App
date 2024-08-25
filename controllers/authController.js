const { getUser } = require("../models/userModel");
const responseHandler = require("../responseHandler");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
require("dotenv").config();
module.exports = {
  login: async (req, res) => {
    try {
      //check if user exists
      const isUser = await getUser(req.body);
      if (isUser.error || !isUser.response) {
        isUser.error
          ? (isUser.error = "Invalid User")
          : (isUser.response = "Invalid User");
        res.cookie("auth", "undefined");
        return responseHandler(isUser, res);
      }
      //get password from isUser and compare
      const { password } = isUser.response.dataValues;
      const isValid = await compare(req.body.password, password);
      if (!isValid) {
        res.cookie("auth", "undefined"); //generating cookie
        return responseHandler({ response: "Invalid Credentials" }, res);
      }
      // now add token if user exists
      const user = isUser.response.dataValues;
      delete user.password;
      const token = sign(user, process.env.SECRET, {
        expiresIn: 6,
      });
      res.cookie("auth", token); //generating cookie
      return responseHandler({ response: token }, res);
    } catch (error) {
      console.log(error);
      return res.send({
        error: error,
      });
    }
  },
};
