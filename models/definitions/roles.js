const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/dbConfig");
const { v4: uuid } = require("uuid");

class roles extends Model {}

roles.init(
  {
    roleId: {
      type: DataTypes.STRING(60),
      primaryKey: true,
    },

    role: {
      type: DataTypes.ENUM, //ENUM is a datatype that is strictly defined
      values: ["Instructor", "Admin", "Trainee"],
      allowNull: false,
    },
  },
  {
    timestamps: true, //sets create time and update time
    paranoid: true, // gives delete time
    modelName: "roles", //table name
    sequelize, //db connection
  }
);

roles.beforeCreate(async (role) => {
  role.roleId = uuid();
});

module.exports = roles;
