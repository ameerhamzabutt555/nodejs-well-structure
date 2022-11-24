const Joi = require('joi');

const activeUser = Joi.object({
  userID: Joi.string().trim().required(),
  accountName: Joi.string().trim().required(),
  accB4BUUID: Joi.string().trim().required(),
  IBAN: Joi.string().trim().required(),
  currency: Joi.string().trim().required(),
  mambuClientId: Joi.string().trim().required(),
});

module.exports = activeUser;
