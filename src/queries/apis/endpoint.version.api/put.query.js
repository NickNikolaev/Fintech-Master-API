const generateUpdateApiVersionEndpointByIdQuery = (
  endpointId,
  versionId,
  method,
  dbObjectId,
  dbObjectUrl,
  enabled,
  username
) =>
  `CALL ECHO_DEV.MILEMARKER.FOXTROT_APIENDPOINT_PUT(${endpointId}, ${versionId}, '${method}', ${dbObjectId}, '${dbObjectUrl}', ${enabled}, '${username}');`;

module.exports = {
  generateUpdateApiVersionEndpointByIdQuery,
};
