const Joi = require("joi");

module.exports = {
  CreateUserSchema: async (req, res, next) => {
    const CreateUser = Joi.object({
      username: Joi.string().min(3).max(34).required(),
      password: Joi.string().min(6).max(18).required(),
    });

    try {
      const validate = await CreateUser.validateAsync(req.body);
      next();
    } catch (error) {
      return res.send({
        error: error,
      });
    }
  },
};
