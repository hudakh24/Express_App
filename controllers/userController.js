const user = [];

module.exports = {
  create: (req, res) => {
    try {
      const { username, password } = req.body;
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

  getuser: (req, res) => {
    try {
      const { username } = req.query;
      user.map((user) => {
        if (user.username === username) {
          return res.send({
            response: "User exists ",
            user,
          });
        }
      });
      return res.send({
        response: "user doesnot exist",
      });
    } catch (error) {
      return res.send({
        error: error.message,
      });
    }
  },

  getuser: (req, res) => {
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

  deleteuser: (req, res) => {
    try {
      const { username, password } = req.query;
      let userDeleted = false;

      // Using map to find and delete the user
      user.map((user, index) => {
        if (user.username === username && user.password === password) {
          user.splice(index, 1);
          userDeleted = true;
        }
      });

      if (userDeleted) {
        return res.send({
          response: `User ${username} deleted successfully`,
        });
      } else {
        return res.send({
          response: "User not found!!",
        });
      }
    } catch (error) {
      return res.send({
        error: error.message,
      });
    }
  },
};
