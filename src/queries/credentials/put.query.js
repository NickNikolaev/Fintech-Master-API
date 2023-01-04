const escapeSpecialCharacters = require('../../utils/escapeSpecialCharacters');

const generateUpdateCredentialByIdQuery = (credentialType, credentialId, customerNumber, body, username) => {
  switch (credentialType) {
    case 'ftp':
      return `CALL MILEMARKER.FOXTROT_CREDENTIAL_PUT_FTP(
      ${credentialId},
      ${customerNumber},
      '${body.name}',
      '${body.description}',
      '${body.username}',
      '${body.password}',
      '${body.encryption}',
      '${username}');`;

    case 'google':
      return `CALL MILEMARKER.FOXTROT_CREDENTIAL_PUT_GOOGLE(
      ${credentialId},
      ${customerNumber},
      '${body.name}',
      '${body.description}',
      '${body.accessToken}',
      '${body.refreshToken}',
      '${body.expiryDate}',
      '${username}');`;

    case 'dropbox':
      return `CALL MILEMARKER.FOXTROT_CREDENTIAL_PUT_DROPBOX(
      ${credentialId},
      ${customerNumber},
      '${body.name}',
      '${body.description}',
      '${body.token}',
      '${username}');`;

    case 'api':
      return `CALL MILEMARKER.FOXTROT_CREDENTIAL_PUT_API(
      ${credentialId},
      ${customerNumber},
      '${body.name}',
      '${body.description}',
      '${escapeSpecialCharacters(body.authentication)}',
      '${username}');`;

    case 'aws':
      return `CALL MILEMARKER.FOXTROT_CREDENTIAL_PUT_AWS(
      ${credentialId},
      ${customerNumber},
      '${body.name}',
      '${body.description}',
      '${body.key}',
      '${body.secret}',
      '${username}');`;

    default:
      break;
  }
};

module.exports = {
  generateUpdateCredentialByIdQuery,
};
