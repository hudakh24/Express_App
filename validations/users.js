const Joi = require("joi");

module.exports = {
  CreateUserSchema: async (req, res, next) => {
    const CreateUser = Joi.object({
      role: Joi.valid("Instructor", "Admin", "Trainee").required(),
      username: Joi.string().min(3).max(34).required(),
      password: Joi.string().min(6).max(18).required(),
      firstName: Joi.string().min(3).max(34).required(),
      lastName: Joi.string().min(3).max(34).required(),
      email: Joi.string().email().required(),
      mobile: Joi.string().required().length(13),
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

  getAllUserSchema: async (req, res, next) => {
    const getAllUser = Joi.object({
      //pagination
      pageNo: Joi.number().required(),
      limit: Joi.number().valid(2, 4).required(), //valid tells no of records to be displayed 2/4
      //sorting
      orderWith: Joi.string().valid(
        "firstName",
        "lastName",
        "username",
        "email",
        "mobile"
      ),
      orderBy: Joi.string().valid("ASC", "DESC"),
      //filter
      username: Joi.string(),
      firstName: Joi.string(),
      lastName: Joi.string(),
      email: Joi.string(),
      mobile: Joi.string(),
      role: Joi.valid("Instructor", "Admin", "Trainee"),
    });

    try {
      const validate = await getAllUser.validateAsync(req.query);
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

  updateTheUser: async (req, res, next) => {
    const updateUser = Joi.object({
      userId: Joi.string().required(),
      username: Joi.string(),
      firstName: Joi.string(),
      lastName: Joi.string(),
      email: Joi.string(),
      mobile: Joi.string(),
    });

    try {
      const validate = await updateUser.validateAsync(req.body);
      next();
    } catch (error) {
      return res.send({
        error: error,
      });
    }
  },
};
