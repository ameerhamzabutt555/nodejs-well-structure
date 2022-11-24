const Joi = require('joi');

const currenciesValidation = Joi.object({
  currencies: Joi.array().required(),
});

module.exports = currenciesValidation;
