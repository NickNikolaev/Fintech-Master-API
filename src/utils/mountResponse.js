const config = require('../config/config');

const mountResponse = (res, statusCode, args = null) => {
  // If there are no arguments -> Return only the status code
  if (!args) return res.status(statusCode).send({ success: true });

  // Create the response body
  const { data, summary, metaData } = args;
  const responseBody = {
    success: true,
    summary,
    data,
  };

  // If the environment is development and there is a metadata -> Add metadata to the response body
  if (config.env === 'development' && metaData) responseBody.summary.metaData = metaData;

  // Return response
  res.status(statusCode).send(responseBody);
};

module.exports = mountResponse;
