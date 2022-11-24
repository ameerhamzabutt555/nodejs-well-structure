const Joi = require('joi');

const payments = Joi.object({
  uuid: Joi.string().trim().required(),
  beneficiary_uuid: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
  payment_reference: Joi.string().trim().required(),
  payment_reason: Joi.string().trim().required(),
  payment_amount: Joi.number(),
  beneficiary_amount: Joi.number(),
  userID: Joi.string().trim().required(),
  payment_currency: Joi.string().trim(),
  beneficiary_currency: Joi.string().trim(),
  fx_quote_uuid: Joi.string().trim(),
});

module.exports = payments;
