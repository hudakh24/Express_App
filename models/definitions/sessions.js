const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/dbConfig");
const { v4: uuid } = require("uuid");
const users = require("./users");

class sessions extends Model {}

sessions.init(
  {
    sessionId: {
      type: DataTypes.STRING(60),
      primaryKey: true,
    },
    userId: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING(),
      references: {
        model: users,
        key: "userId",
      },
    },

    token: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
  },
  {
    timestamps: true, //sets create time and update time
    modelName: "sessions", //table name
    sequelize, //db connection
  }
);

sessions.beforeCreate(async (session) => {
  session.sessionId = uuid();
});

module.exports = sessions;
