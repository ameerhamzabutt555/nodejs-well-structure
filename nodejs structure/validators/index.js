const login = require('./login.validator');
const register = require('./register.validator');
const otp = require('./otp.validator');
const otpVerify = require('./otpVerify.validator');
const addBeneficiary = require('./addBeneficiary.validator');
const resetPassword = require('./resetPassword.validator');
const getOneBeneficiary = require('./getOneBeneficiary.validator');
const disabledBeneficiary = require('./disableBeneficiary.validator');
const currencyConversion = require('./currencyConversion.validator');
const currencies = require('./currencies.validator');
const activeUser = require('./activeUser.validator');
const getUserAllAccounts = require('./getUserAllAccounts.validator');
const payment = require('./payment.validator');

module.exports = {
  login,
  register,
  otp,
  otpVerify,
  addBeneficiary,
  resetPassword,
  getOneBeneficiary,
  disabledBeneficiary,
  currencyConversion,
  currencies,
  activeUser,
  payment,
  getUserAllAccounts,
};
