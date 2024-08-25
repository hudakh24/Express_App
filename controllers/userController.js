const {
  createUser,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  profile,
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
      req.query.offset = (req.query.pageNo - 1) * req.query.limit;
      const users = await getAllUsers(req.query);
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

  update: async (req, res) => {
    try {
      const user = await updateUser(req.body);
      responseHandler(user, res);
    } catch (error) {
      return res.send({
        error: error.message,
      });
    }
  },

  getProfile: async (req, res) => {
    try {
      const userProfile = await profile(req.user);
      responseHandler(userProfile, res);
    } catch (error) {
      return res.send({
        error: error.message,
      });
    }
  },
};
