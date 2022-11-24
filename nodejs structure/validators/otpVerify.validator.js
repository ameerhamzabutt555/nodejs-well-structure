const Joi = require('joi');
const { OTP_REGEX, PHONE_REGEX } = require('../constants/contants');

const otpverifyValidation = Joi.object({
  phoneNo: Joi.string().trim().pattern(new RegExp(PHONE_REGEX), 'Invalid phone number').required(),
  otp: Joi.string().trim().pattern(new RegExp(OTP_REGEX), 'Invalid phone number').required(),
});

module.exports = otpverifyValidation;
