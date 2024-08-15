const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/dbConfig");

class users extends Model {}

users.init(
  {
    userId: {
      type: DataTypes.STRING(60),
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(34),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
  },
  {
    timestamps: true, //sets create time and update time
    paranoid: true, // gives delete time
    modelName: "users", //table name
    sequelize, //db connection
  }
);

module.exports = users;
