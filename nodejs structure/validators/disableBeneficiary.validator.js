const Joi = require('joi');

const disableBeneficiaryValidation = Joi.object({
  disabled: Joi.boolean().required(),
  uuid: Joi.string().trim().required(),
});

module.exports = disableBeneficiaryValidation;
