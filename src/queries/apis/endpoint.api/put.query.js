const generateUpdateApiEndpointByIdQuery = (apiId, endpointId, method, objectId, url, enabled, username) =>
  `CALL ECHO_DEV.MILEMARKER.FOXTROT_APIENDPOINT_PUT(${apiId}, ${endpointId}, '${method}', ${objectId}, '${url}', ${enabled}, '${username}')`;

module.exports = {
  generateUpdateApiEndpointByIdQuery,
};
