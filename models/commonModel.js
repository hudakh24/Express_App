const { response } = require("express");
const { models } = require("./index");

module.exports = {
  getRole: async ({ role }) => {
    try {
      const roles = await models.roles.findOne({
        where: {
          role: role, //Key:value
        },
      });
      return {
        response: roles,
      };
    } catch (error) {
      console.log(error);
      return {
        error: error,
      };
    }
  },
};
