const { models } = require("./index");
const { Op } = require("sequelize");

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

  getAllUsers: async (query) => {
    try {
      const users = await models.users.findAll({
        where: {
          //checks firstName exists? if yes creates an object and then filer is performed on the firstName column
          ...(query.firstName
            ? { firstName: { [Op.substring]: query.firstName } }
            : true),
          ...(query.lastName
            ? { lastName: { [Op.substring]: query.lastName } }
            : true),
          ...(query.mobile
            ? { mobile: { [Op.substring]: query.mobile } }
            : true),
          ...(query.email ? { email: { [Op.substring]: query.email } } : true),
          ...(query.username
            ? { username: { [Op.substring]: query.username } }
            : true),
        },
        //attributes: ["userId", "username"],
        attributes: { exclude: ["password"] },
        include: [
          {
            model: models.roles, //joining with table roles
            attributes: ["role"],
            //role filter here bcz it exist in role table
            where: {
              ...(query.role ? { role: query.role } : true),
            },
          },
        ],
        // order:[["order", "by"]], order accepts two values
        order: [
          [
            query.orderWith ? query.orderWith : "firstName",
            query.orderBy ? query.orderBy : "ASC",
          ],
        ],
        offset: query.offset,
        limit: query.limit,
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

  getUser: async ({ username, userId }) => {
    try {
      const user = await models.users.findOne({
        where: {
          //...() this means that we are using ternary operator in where clause
          ...(userId ? { userId: userId } : { username: username }),
        },
        //attributes: ["userId", "username"],
        // attributes: { exclude: ["password"] },
        include: [
          {
            model: models.roles, //joining with table roles
            attributes: ["role"],
          },
        ],
        // paranoid: false, //this will show deleted user too
      });
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

  deleteUser: async ({ username, userId }) => {
    try {
      const user = await models.users.destroy({
        where: {
          //...() this means that we are using ternary operator in where clause
          ...(userId ? { userId: userId } : { username: username }),
        },
      });
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

  updateUser: async ({ userId, ...body }) => {
    try {
      const user = await models.users.update(
        { ...body },
        {
          where: {
            userId: userId,
          },
        }
      );
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

  profile: async ({ userId }) => {
    try {
      const user = await models.users.findOne({
        where: {
          userId: userId,
        },
        attributes: { exclude: ["password"] },
      });
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
};
