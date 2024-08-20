const Joi = require("joi");

module.exports = {
  CreateUserSchema: async (req, res, next) => {
    const CreateUser = Joi.object({
      role: Joi.valid("Instructor", "Admin", "Trainee").required(),
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

  userSchema: async (req, res, next) => {
    const user = Joi.object({
      username: Joi.string().min(3).max(34),
      userId: Joi.string(),
    });

    try {
      await user.validateAsync(req.query);
      next();
    } catch (error) {
      return res.send({
        error: error,
      });
    }
  },

  // DeleteUserName: async (req, res, next) => {
  //   const deleteUser = Joi.object({
  //     username: Joi.string().min(3).max(34).required(),
  //     password: Joi.string().min(6).max(18).required(),
  //   });

  //   try {
  //     const validate = await deleteUser.validateAsync(req.query);
  //     next();
  //   } catch (error) {
  //     return res.send({
  //       error: error,
  //     });
  //   }
  // },

  UpdateTheUser: async (req, res, next) => {
    const newUser = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
      newUsername: Joi.string().min(3).max(34),
      newPassword: Joi.string().min(6).max(18),
    });

    try {
      const validate = await newUser.validateAsync(req.body);
      next();
    } catch (error) {
      return res.send({
        error: error,
      });
    }
  },
};
