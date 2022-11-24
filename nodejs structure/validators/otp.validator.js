const Joi = require('joi');
const { PHONE_REGEX } = require('../constants/contants');

const otpValidation = Joi.object({
  phoneNo: Joi.string().trim().pattern(new RegExp(PHONE_REGEX), 'Invalid phone number').required(),
});

module.exports = otpValidation;
