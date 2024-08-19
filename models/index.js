const sequelize = require("../bin/dbConfig");
const users = require("./definitions/users");
const roles = require("./definitions/roles");

const models = { users, roles };

//make relation between tables
roles.hasMany(users, { foreignKey: "roleId" }); // roles and users have 1:M
users.belongsTo(roles, { foreignKey: "roleId" });

const db = {};

db.sequelize = sequelize; //new key to object
sequelize.models = models;

module.exports = { db, models };
