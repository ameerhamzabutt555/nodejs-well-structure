const Joi = require('joi');

const addBeneficiaryValidation = Joi.object({
  name: Joi.string().trim().required(),
  account: Joi.string().trim().required(),
  uuid: Joi.string().trim().required(),
  address: Joi.object({
    line_1: Joi.string().trim().required(),
    city: Joi.string().trim().required(),
    postcode: Joi.string().trim().required(),
    country: Joi.string().trim().required(),
  }),
  accID: Joi.string().trim().required(),
  person: Joi.boolean().falsy('N'),
  isCompany: Joi.boolean().falsy('N'),
});

module.exports = addBeneficiaryValidation;
