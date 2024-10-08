var { hash, compare } = require("bcryptjs");
const user = [];
module.exports = {
  user,
  create: async (req, res) => {
    try {
      let { username, password } = req.body;
      let userExists = false;

      // Using map to check if the user already exists
      user.map((user) => {
        if (user.username === username) {
          userExists = true;
        }
      });

      if (userExists) {
        // If user exists, send this response
        return res.send({
          response: "User already exists",
        });
      } else {
        // If user does not exist, add the user and send the response
        password = await hash(password, 10);
        user.push({ username, password });
        return res.send({
          response: username, // return the username
          password, // return the password
        });
      }
    } catch (error) {
      return res.send({
        error: error.message, // Ensure the error message is sent if an error occurs
      });
    }
  },

  getAll: (req, res) => {
    try {
      return res.send({
        response: user,
      });
    } catch (error) {
      return res.send({
        error: error.message,
      });
    }
  },

  getUser: (req, res) => {
    try {
      const { username } = req.query;
      user.map((user) => {
        if (user.username === username) {
          return res.send({
            response: "User exists",
            user,
          });
        }
      });
      return res.send({
        response: "User does not exist",
      });
    } catch (error) {
      return res.send({
        error: error.message,
      });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { username, password, newUsername, newPassword } = req.body;
      let userUpdated = false;

      // Loop through users and update if username and password match
      await Promise.all(
        user.map(async (user) => {
          if (user.username === username) {
            const isMatch = await compare(password, user.password);
            if (isMatch) {
              // Update the username if newUsername is provided
              if (newUsername) {
                user.username = newUsername;
              }

              // Update the password if newPassword is provided
              if (newPassword) {
                user.password = await hash(newPassword, 10); // Hash the new password
              }

              userUpdated = true; // Mark that the user was updated
            }
          }
        })
      );

      if (userUpdated) {
        return res.send({
          response: `${username} updated successfully`,
          user, // Optionally return the updated user list
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

  deleteUser: async (req, res) => {
    try {
      let { username, password } = req.query;
      let userDeleted = false;

      //The map function itself does not handle promises or async operations so use promise.all
      await Promise.all(
        user.map(async (user, index, array) => {
          if (user.username === username) {
            const isMatch = await compare(password, user.password);
            if (isMatch) {
              array.splice(index, 1); // Remove user from the array
              userDeleted = true; // Set flag to true
            }
          }
        })
      );

      if (userDeleted) {
        return res.send({
          response: `User ${username} deleted successfully`,
        });
      } else {
        return res.send({
          response: "user not found",
        });
      }
    } catch (error) {
      return res.send({
        error: error.message,
      });
    }
  },
};
