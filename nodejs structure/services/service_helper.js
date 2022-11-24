const axios = require('axios');

const serviceHelper = async (method, url, auth, data, accept) => {
  const config = {
    method,
    url,
    headers: {
      Authorization: auth,
      'Content-Type': 'application/json',
      Accept: accept,
    },
    data,
  };
  const response = await axios(config);
  return response;
};

module.exports = { serviceHelper };
