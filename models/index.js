const sequelize = require("../bin/dbConfig");
const users = require("./definitions/users");
const roles = require("./definitions/roles");
const sessions = require("./definitions/sessions");

const models = { users, roles };

//make relation between tables
roles.hasMany(users, { foreignKey: "roleId" }); // roles and users have 1:M
users.belongsTo(roles, { foreignKey: "roleId" });

users.hasOne(users, { foreignKey: "userId" }); //1:1 relation btw users and sessions
sessions.belongsTo(users, { foreignKey: "userId" });
const db = {};

db.sequelize = sequelize; //new key to object
sequelize.models = models;

module.exports = { db, models };
