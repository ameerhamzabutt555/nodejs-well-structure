const Joi = require('joi');

const getUserAllAccounts = Joi.object({
  userID: Joi.string().trim().required(),
});

module.exports = getUserAllAccounts;
