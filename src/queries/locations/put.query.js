const he = require('he');
const escapeSpecialCharacters = require('../../utils/escapeSpecialCharacters');

const generateUpdateLocationByIdQuery = (locationType, locationId, customerNumber, body, username) => {
  switch (locationType) {
    case 'ftp':
      return `CALL MILEMARKER.FOXTROT_LOCATION_PUT_FTP(
      ${locationId},
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
      return `CALL MILEMARKER.FOXTROT_LOCATION_PUT_GOOGLE(
      ${locationId},
      ${customerNumber},
      '${body.name}',
      '${body.description}',
      ${body.credentials},
      '${username}');`;

    case 'dropbox':
      return `CALL MILEMARKER.FOXTROT_LOCATION_PUT_DROPBOX(
      ${locationId},
      ${customerNumber},
      '${body.name}',
      '${body.description}',
      ${body.credentials},
      '${username}');`;

    case 'api':
      return `CALL MILEMARKER.FOXTROT_LOCATION_PUT_API(
      ${locationId},
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

    case 'dbConnection':
      return `CALL MILEMARKER.FOXTROT_LOCATION_PUT_DBCONNECTION(
      ${locationId},
      ${customerNumber},
      '${body.name}',
      '${body.description}',
      '${he.decode(escapeSpecialCharacters(body.object))}',
      '${username}');`;

    case 's3':
      return `CALL MILEMARKER.FOXTROT_LOCATION_PUT_AWS(
      ${locationId},
      ${customerNumber},
      '${body.name}',
      '${body.description}',
      ${body.credentials},
      '${body.bucket}',
      '${body.region}',
      '${body.bucketFolder}',
      '${username}');`;

    case 'glacier':
      return `CALL MILEMARKER.FOXTROT_LOCATION_PUT_GLACIER(
      ${locationId},
      ${customerNumber},
      '${body.name}',
      '${body.description}',
      ${body.credentials},
      '${body.vault}',
      '${body.region}',
      '${username}');`;

    case 'dynamo':
      return `CALL MILEMARKER.FOXTROT_LOCATION_PUT_DYNAMO(
      ${locationId},
      ${customerNumber},
      '${body.name}',
      '${body.description}',
      ${body.credentials},
      '${body.table}',
      '${body.region}',
      '${username}');`;

    case 'redshift':
      return `CALL MILEMARKER.FOXTROT_LOCATION_PUT_REDSHIFT(
      ${locationId},
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
  generateUpdateLocationByIdQuery,
};
