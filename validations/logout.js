const Joi = require("joi");

module.exports = {
  LogoutUserSchema: async (req, res, next) => {
    const logoutUser = Joi.object({
      token: Joi.string().required(),
    });

    try {
      const validate = await logoutUser.validateAsync(req.query);
      next();
    } catch (error) {
      return res.send({
        error: error,
      });
    }
  },
};
