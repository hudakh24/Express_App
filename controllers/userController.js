const user = [];

module.exports = {
  create: (req, res) => {
    try {
      user.push(req.body);
      return res.send({
        response: user,
      });
    } catch {
      return res.send({
        error: error,
      });
    }
  },
  getAll: (req, res) => {
    try {
      return res.send({
        response: user,
      });
    } catch {
      return res.send({
        error: error,
      });
    }
  },
};
