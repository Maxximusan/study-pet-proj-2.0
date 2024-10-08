// email - не нужнен для phonebook
const Joi = require("joi");
const schemaAdd = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  //   email: Joi.string()
  //     .email({
  //       minDomainSegments: 2,
  //       tlds: { allow: ["com", "net"] },
  //     })
  //     .required(),

  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const schemaUpdate = Joi.object({
  name: Joi.string().min(3).max(30),

  //   email: Joi.string().email({
  //     minDomainSegments: 2,
  //     tlds: { allow: ["com", "net"] },
  //   }),

  phone: Joi.string().min(1),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = { schemaAdd, schemaUpdate, updateFavoriteSchema };
