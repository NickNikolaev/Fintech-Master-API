const generateCreateApiVersionEndpointQuery = (versionId, method, dbObjectId, dbObjectUrl, enabled, username) =>
  `CALL ECHO_DEV.MILEMARKER.FOXTROT_APIENDPOINT_POST(${versionId}, '${method}', ${dbObjectId}, '${dbObjectUrl}', ${enabled}, '${username}');`;

module.exports = {
  generateCreateApiVersionEndpointQuery,
};
