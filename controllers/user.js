const user = [];

module.exports = {
  create: (req, res) => {
    try {
      user.push(req.body);
      return res.send({
        message: "User created successfully", // Custom message
        user: req.body, // Optionally, return the created user
      });
    } catch (error) {
      return res.send({
        error: error.message, // Send the error message
      });
    }
  },
  getAll: (req, res) => {
    try {
      return res.send({
        message: " All Users list", // Custom message
        users: user, // Return all users
      });
    } catch (error) {
      return res.send({
        error: error.message, // Send the error message
      });
    }
  },

  deleteUser: (req, res) => {
    try {
      return res.send({
        message: "Users Deleted successfully", // Custom message
        //users: user, // Return all users
      });
    } catch (error) {
      return res.send({
        error: error.message, // Send the error message
      });
    }
  },
};
