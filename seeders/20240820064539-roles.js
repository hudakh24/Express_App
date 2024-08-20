const { v4: uuid } = require("uuid");
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("roles", [
      {
        roleId: uuid(),
        role: "Instructor",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        roleId: uuid(),
        role: "Admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: uuid(),
        role: "Trainee",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
};
