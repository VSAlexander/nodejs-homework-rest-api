const Joi = require("joi");

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  subscription: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const verifyEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});

const updateStatusUserSchema = Joi.object({
  subscription: Joi.string(),
});

module.exports = {
  signupSchema,
  loginSchema,
  updateStatusUserSchema,
  verifyEmailSchema,
};
