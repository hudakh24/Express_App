const { compare } = require("bcryptjs");
const { user } = require("./userController"); // Import users from userController

module.exports = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      let userExists = false;

      // Using map to check if the user already exists
      await Promise.all(
        user.map(async (user) => {
          if (user.username === username) {
            const isMatch = await compare(password, user.password);
            if (isMatch) {
              userExists = true;
            }
          }
        })
      );

      if (userExists) {
        return res.send({
          response: `${username} logged in`,
        });
      } else {
        return res.status(401).send({
          response: " User not found",
        });
      }
    } catch (error) {
      return res.send({
        error: error.message,
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
