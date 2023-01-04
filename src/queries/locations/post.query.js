const he = require('he');
const escapeSpecialCharacters = require('../../utils/escapeSpecialCharacters');

const generateCreateLocationQuery = (locationType, customerNumber, body, username) => {
  switch (locationType) {
    case 'ftp':
      return `CALL MILEMARKER.FOXTROT_LOCATION_POST_FTP(
      ${customerNumber},
      '${body.name}',
      '${body.description}',
      '${body.host}',
      ${body.port},
      '${body.protocol}',
      ${body.credentials},
      '${body.folder}',
      '${username}');`;

    case 'google':
      return `CALL MILEMARKER.FOXTROT_LOCATION_POST_GOOGLE(
      ${customerNumber},
      '${body.name}',
      '${body.description}',
      ${body.credentials},
      '${username}');`;

    case 'dropbox':
      return `CALL MILEMARKER.FOXTROT_LOCATION_POST_DROPBOX(
      ${customerNumber},
      '${body.name}',
      '${body.description}',
      ${body.credentials},
      '${username}');`;

    case 'api':
      return `CALL MILEMARKER.FOXTROT_LOCATION_POST_API(
      ${customerNumber},
      '${body.name}',
      '${body.description}',
      ${body.credentials},
      '${body.endpoint}',
      '${body.method}',
      '${body.dataObject}',
      ${body.timeout},
      '${escapeSpecialCharacters(body.config)}',
      '${username}');`;

    case 'db-connection':
      return `CALL MILEMARKER.FOXTROT_LOCATION_POST_DBCONNECTION(
      ${customerNumber},
      '${body.name}',
      '${body.description}',
      '${he.decode(escapeSpecialCharacters(body.object))}',
      '${username}');`;

    default:
      break;
  }
};

const generateCreateAWSLocationQuery = (awsLocationType, customerNumber, body, username) => {
  switch (awsLocationType) {
    case 's3':
      return `CALL MILEMARKER.FOXTROT_LOCATION_POST_AWS(
      ${customerNumber},
      '${body.name}',
      '${body.description}',
      ${body.credentials},
      '${body.bucket}',
      '${body.region}',
      '${body.bucketFolder}',
      '${username}');`;

    case 'dynamo':
      return `CALL MILEMARKER.FOXTROT_LOCATION_POST_DYNAMO(
      ${customerNumber},
      '${body.name}',
      '${body.description}',
      ${body.credentials},
      '${body.table}',
      '${body.region}',
      '${username}');`;

    case 'glacier':
      return `CALL MILEMARKER.FOXTROT_LOCATION_POST_GLACIER(
      ${customerNumber},
      '${body.name}',
      '${body.description}',
      ${body.credentials},
      '${body.vault}',
      '${body.region}',
      '${username}');`;

    case 'redshift':
      return `CALL MILEMARKER.FOXTROT_LOCATION_POST_REDSHIFT(
      ${customerNumber},
      '${body.name}',
      '${body.description}',
      ${body.credentials},
      '${body.username}',
      '${body.password}',
      '${body.database}',
      ${body.port},
      '${body.host}',
      '${username}');`;

    default:
      break;
  }
};

module.exports = {
  generateCreateLocationQuery,
  generateCreateAWSLocationQuery,
};
