const { models } = require("./index");

module.exports = {
  createUser: async (body) => {
    try {
      const user = await models.users.create({ ...body });
      //   const user = models.users.create({ username: body.username, password: body.password });
      return {
        response: user,
      };
    } catch (error) {
      console.error(error);
      return {
        error: error,
      };
    }
  },

  getAllUsers: async () => {
    try {
      const users = await models.users.findAll({
        //attributes: ["userId", "username"],
        attributes: { exclude: ["password"] },
      });
      return {
        response: users,
      };
    } catch (error) {
      console.error(error);
      return {
        error: error,
      };
    }
  },
};
