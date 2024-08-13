const { Sequelize } = require("sequelize");

// connecting to Database
const sequelize = new Sequelize("ExpressApp", "postgres", "admin12345", {
  host: "localhost",
  dialect: "postgres", //mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

// Testing Database
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = sequelize;
module.exports = { connectDB };
