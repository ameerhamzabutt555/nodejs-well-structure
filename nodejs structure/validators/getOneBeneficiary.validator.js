const Joi = require('joi');

const getOneBeneficiaryValidation = Joi.object({
  uuid: Joi.string().trim().required(),
});

module.exports = getOneBeneficiaryValidation;
