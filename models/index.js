const sequelize = require("../bin/dbConfig");
const users = require("./definitions/users");

const models = { users };

const db = {};

db.sequelize = sequelize; //new key to object
sequelize.models = models;

module.exports = { db, models };
