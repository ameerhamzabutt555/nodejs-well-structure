// centralized function for logging
const { dataAccessLayer } = require('../components/access_layer/DAL');
const LoggingModal = require('../models/logging.model');

const Logging = async (req, description, module, userId = '', email = '') => {
  const ip = (req.headers && req.headers['x-forwarded-for'])
  || req.ip
  || req._remoteAddress
  || (req.connection && req.connection.remoteAddress);
  //   if (req.headers && req.headers.token) {

  //   }
  await dataAccessLayer(LoggingModal).create({
    userId, description, module, email, ip,
  });
};

module.exports = { Logging };
