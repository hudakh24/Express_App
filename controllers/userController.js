const {
  createUser,
  getAllUsers,
  getUser,
  deleteUser,
} = require("../models/userModel");
const { response } = require("express");
var { hash, compare } = require("bcryptjs");
const responseHandler = require("../responseHandler");
const { getRole } = require("../models/commonModel");
const user = [];
module.exports = {
  user,
  create: async (req, res) => {
    try {
      const role = await getRole(req.body);
      if (role.error) {
        return res.send({
          error: role.error,
        });
      }
      // console.log(role.response.dataValues);
      delete req.body.role;
      req.body.roleId = role.response.dataValues.roleId;

      const user = await createUser(req.body);
      responseHandler(user, res);
    } catch (error) {
      return res.send({ error: error });
    }
  },

  getAll: async (req, res) => {
    try {
      const users = await getAllUsers();
      responseHandler(users, res);
    } catch (error) {
      return res.send({
        error: error.message,
      });
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await getUser(req.query);
      responseHandler(user, res);
    } catch (error) {
      return res.send({
        error: error.message,
      });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const user = await deleteUser(req.query);
      responseHandler(user, res);
    } catch (error) {
      return res.send({
        error: error.message,
      });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { username, password, newUsername, newPassword } = req.body;
      let userUpdated = false;

      // Loop through users and update if username and password match
      await Promise.all(
        user.map(async (user) => {
          if (user.username === username) {
            const isMatch = await compare(password, user.password);
            if (isMatch) {
              // Update the username if newUsername is provided
              if (newUsername) {
                user.username = newUsername;
              }

              // Update the password if newPassword is provided
              if (newPassword) {
                user.password = await hash(newPassword, 10); // Hash the new password
              }

              userUpdated = true; // Mark that the user was updated
            }
          }
        })
      );

      if (userUpdated) {
        return res.send({
          response: `${username} updated successfully`,
          user, // Optionally return the updated user list
        });
      } else {
        return res.send({
          response: "User not found or password incorrect",
        });
      }
    } catch (error) {
      return res.send({
        error: error.message,
      });
    }
  },
};
