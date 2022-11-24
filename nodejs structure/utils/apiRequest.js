const axios = require('axios');

const ApiReuest = async (config) => {
  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    return error;
  }
};

module.exports = { ApiReuest };
