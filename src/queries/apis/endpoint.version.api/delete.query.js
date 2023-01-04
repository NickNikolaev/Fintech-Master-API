const generateDeleteApiVersionEndpointByIdQuery = (endpointId, username) =>
  `CALL ECHO_DEV.MILEMARKER.FOXTROT_APIENDPOINT_DELETE(${endpointId}, '${username}')`;

module.exports = {
  generateDeleteApiVersionEndpointByIdQuery,
};
