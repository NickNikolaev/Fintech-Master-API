const generateUpdateApiVersionByIdQuery = (versionId, username, enabled, isPublic, version) =>
  `CALL ECHO_DEV.MILEMARKER.FOXTROT_APIVERSION_PUT(${versionId}, '${username}', ${enabled}, ${isPublic}, ${version}, '${username}')`;

module.exports = {
  generateUpdateApiVersionByIdQuery,
};
