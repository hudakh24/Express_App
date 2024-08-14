const { compare } = require("bcryptjs");
const { user } = require("./userController"); // Import users from userController

module.exports = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      let userExists = false;

      // Using map to check if the user already exists
      user.map((user) => {
        if (user.username === username) {
          userExists = true;
        }
      });

      if (!userExists) {
        return res.status(401).send({
          response: "User not found",
        });
      }

      // Compare provided password with the stored hashed password
      const isMatch = await compare(password, user.password);

      if (isMatch) {
        return res.send({
          response: "User logged in",
        });
      } else {
        return res.status(401).send({
          response: "Invalid password",
        });
      }
    } catch (error) {
      return res.send({
        error: error.message, // Send error message in case of any exception
      });
    }
  },

  logout: (req, res) => {
    try {
      return res.send({
        response: "User logged out",
      });
    } catch (error) {
      return res.send({
        error: error.message,
      });
    }
  },
};
