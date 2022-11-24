const {
  B4B_WEBSERVICES_USERNAME,
  B4B_WEBSERVICES_PASSWORD,
  MAMBU_WEBSERVICES_USERNAME,
  MAMBU_WEBSERVICES_PASSWORD,
} = require('../utils/config');

const ENCODED_B4B_TOKEN_64 = Buffer.from(
  `${B4B_WEBSERVICES_USERNAME}:${B4B_WEBSERVICES_PASSWORD}`,
).toString('base64');

const ENCODED_MAMBU_TOKEN_64 = Buffer.from(
  `${MAMBU_WEBSERVICES_USERNAME}:${MAMBU_WEBSERVICES_PASSWORD}`,
).toString('base64');

const BASE_URL = 'https://staging.b4bpayments.com/services/json/';
const BASE_URL_MAMBU = 'https://onemoneywaydev.sandbox.mambu.com/api/';

module.exports = {
  PHONE_REGEX: /^(\+\d{1,3}[- ]?)?\d{10}$/,
  OTP_REGEX: /^[0-9]*$/,
  SALT_ROUNDS: 12,
  ENCODED_B4B_TOKEN_64,
  BASE_URL,
  BASE_URL_MAMBU,
  ENCODED_MAMBU_TOKEN_64,
};
