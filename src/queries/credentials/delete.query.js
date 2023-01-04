const generateDeleteCredentialByIdQuery = (credentialId, username) =>
  `CALL MILEMARKER.FOXTROT_CREDENTIAL_DELETE(${credentialId}, '${username}')`;

module.exports = {
  generateDeleteCredentialByIdQuery,
};
