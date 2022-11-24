const basicInfo = require('./basicInfo');
const servers = require('./servers');
const tags = require('./tags');

module.exports = {
  ...basicInfo,
  ...servers,
  ...tags,
};
