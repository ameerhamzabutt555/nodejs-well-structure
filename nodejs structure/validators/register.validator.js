const Joi = require('joi');
const { PHONE_REGEX } = require('../constants/contants');

const registerValidation = Joi.object({
  companyName: Joi.string().trim().required(),
  companyAddress: Joi.string().trim().required(),
  email: Joi.string().email().trim().lowercase()
    .required(),
  phoneNo: Joi.string().trim().pattern(new RegExp(PHONE_REGEX), 'Invalid phone number').required(),
  password: Joi.string().trim().min(6).required(),
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  companyID: Joi.string(),
});

module.exports = registerValidation;
