const { compare } = require("bcryptjs");
const { user } = require("./userController"); // Import users from userController

module.exports = {
  login: async (req, res) => {
    try {
      let { username, password } = req.query;
      let userLogin = false;

      //The map function itself does not handle promises or async operations so use promise.all
      await Promise.all(
        user.map(async (user) => {
          if (user.username === username) {
            const isMatch = await compare(password, user.password);
            if (isMatch) {
              userLogin = true; // Set flag to true
            }
          }
        })
      );

      if (userLogin) {
        return res.send({
          response: `User ${username} loggedIn successfully`,
        });
      } else {
        return res.send({
          response: "User not found or password incorrect",
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
