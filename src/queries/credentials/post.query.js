const escapeSpecialCharacters = require('../../utils/escapeSpecialCharacters');

const generateCreateCredentialQuery = (credentialType, customerNumber, body, username) => {
  switch (credentialType) {
    case 'ftp':
      return `CALL MILEMARKER.FOXTROT_CREDENTIAL_POST_FTP(
      ${customerNumber},
      '${body.name}',
      '${body.description}',
      '${body.username}',
      '${body.password}',
      '${body.encryption}',
      '${username}');`;

    case 'google':
      return `CALL MILEMARKER.FOXTROT_CREDENTIAL_POST_GOOGLE(
      ${customerNumber},
      '${body.name}',
      '${body.description}',
      '${body.accessToken}',
      '${body.refreshToken}',
      ${body.expiryDate},
      '${username}');`;

    case 'dropbox':
      return `CALL MILEMARKER.FOXTROT_CREDENTIAL_POST_DROPBOX(
      ${customerNumber},
      '${body.name}',
      '${body.description}',
      '${body.token}',
      '${username}');`;

    case 'aws':
      return `CALL MILEMARKER.FOXTROT_CREDENTIAL_POST_AWS(
      ${customerNumber},
      '${body.name}',
      '${body.description}',
      '${body.key}',
      '${body.secret}',
      '${username}');`;

    case 'api':
      return `CALL MILEMARKER.FOXTROT_CREDENTIAL_POST_API(
      ${customerNumber},
      '${body.name}',
      '${body.description}',
      '${escapeSpecialCharacters(body.authentication)}',
      '${username}');`;

    default:
      break;
  }
};

module.exports = {
  generateCreateCredentialQuery,
};
