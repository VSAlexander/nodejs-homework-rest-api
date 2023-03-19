const Joi = require("joi");

const addAndUpdateSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const updateStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  addAndUpdateSchema,
  updateStatusSchema,
};
