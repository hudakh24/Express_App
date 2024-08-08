module.exports = {
  login: (req, res) => {
    try {
      return res.send({
        response: "user logged in",
      });
    } catch {
      return res.send({
        error: error,
      });
    }
  },
  logout: (req, res) => {
    try {
      return res.send({
        response: "User logged out",
      });
    } catch {
      return res.send({
        error: error,
      });
    }
  },
};
