const Joi = require('joi');

const resetPasswordValidation = Joi.object({
  password: Joi.string().trim().min(6).required(),
});

module.exports = resetPasswordValidation;
