//Joi - проверяет тело запроса

const Joi = require("joi");

const joiSingupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

module.exports = { joiSingupSchema, joiLoginSchema };
