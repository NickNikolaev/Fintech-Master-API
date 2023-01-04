const generateDeleteApiByIdQuery = (apiId, username) =>
  `CALL ECHO_DEV.MILEMARKER.FOXTROT_API_DELETE(${apiId}, '${username}')`;

module.exports = {
  generateDeleteApiByIdQuery,
};
