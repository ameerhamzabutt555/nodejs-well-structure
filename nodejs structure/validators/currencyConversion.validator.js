const Joi = require('joi');

const currencyConversionValidation = Joi.object({
  payment_currency: Joi.string().trim().required(),
  payment_amount: Joi.number(),
  uuid: Joi.string().trim().required(),
  beneficiary_currency: Joi.string().trim().required(),
  beneficiary_amount: Joi.number(),
});

module.exports = currencyConversionValidation;
