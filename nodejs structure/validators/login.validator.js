const Joi = require('joi');
const { PHONE_REGEX } = require('../constants/contants');

const loginValidation = Joi.object({
  email: Joi.string().email().lowercase(),
  phoneNo: Joi.string().trim().pattern(new RegExp(PHONE_REGEX), 'Invalid phone number'),
  password: Joi.string().trim().min(6).required(),
}).or('email', 'phoneNo');

module.exports = loginValidation;
