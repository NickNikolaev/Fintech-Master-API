const generateGetAllCredentialsQuery = (customerNumber) =>
  `SELECT * FROM MILEMARKER.FOXTROT_CREDENTIAL_GET WHERE "customerNumber" = '${customerNumber}' `;

const generateGetCredentialByIdQuery = (customerNumber, credentialId) =>
  `SELECT * FROM MILEMARKER.FOXTROT_CREDENTIAL_GET WHERE "customerNumber" = '${customerNumber}' AND "milemarkerSystemId" = ${credentialId} `;

module.exports = {
  generateGetAllCredentialsQuery,
  generateGetCredentialByIdQuery,
};
