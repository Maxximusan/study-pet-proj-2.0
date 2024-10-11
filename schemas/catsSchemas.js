const Joi = require("joi");

const schemaAddCat = Joi.object({
  imageUrl: Joi.string().required(),
  breed: Joi.string().required(),
});

module.exports = { schemaAddCat };
