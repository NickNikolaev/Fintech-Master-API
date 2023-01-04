const escapeSpecialCharacters = require('../../utils/escapeSpecialCharacters');

const generateCreateTaskQuery = (taskType, customerNumber, body, username) => {
  switch (taskType) {
    case 'move':
      return `CALL MILEMARKER.FOXTROT_TASK_POST_MOVE(
      ${customerNumber}, 
      '${body.name}',
      '${body.description}',
      '${JSON.stringify(body.location)}',
      '${escapeSpecialCharacters(body.file)}',
      '${escapeSpecialCharacters(body.config)}',
      '${username}');`;

    case 'parse':
      return `CALL MILEMARKER.FOXTROT_TASK_POST_PARSE(
      ${customerNumber},
      '${body.name}',
      '${body.description}',
      '${JSON.stringify(body.location)}',
      '${escapeSpecialCharacters(body.file)}',
      '${escapeSpecialCharacters(body.config)}',
      '${username}');`;

    case 'api':
      return `CALL MILEMARKER.FOXTROT_TASK_POST_API(
      ${customerNumber},
      '${body.name}',
      '${body.description}',
      '${body.getData}',
      '${body.postData}',
      '${username}');`;

    case 'createFile':
      return `CALL MILEMARKER.FOXTROT_TASK_POST_CREATEFILE(
      ${customerNumber},
      '${body.name}',
      '${body.description}',
      '${JSON.stringify(body.location)}',
      '${escapeSpecialCharacters(body.file)}',
      '${escapeSpecialCharacters(body.config)}',
      '${username}');`;

    case 'convertFile':
      return `CALL MILEMARKER.FOXTROT_TASK_POST_CONVERTFILE(
      ${customerNumber},
      '${body.name}',
      '${body.description}',
      '${body.fileType}',
      '${username}');`;

    case 'getFile':
    case 'mojo':
      return `CALL MILEMARKER.FOXTROT_CREDENTIAL_POST_AWS(
      ${customerNumber},
      '${body.name}',
      '${body.description}',
      '${body.key}',
      '${body.secret}',
      '${username}');`;

    case 'getData':
      return `CALL MILEMARKER.FOXTROT_TASK_POST_GETDATA(
      ${customerNumber},
      '${body.name}',
      '${body.description}',
      '${JSON.stringify(body.location)}',
      '${escapeSpecialCharacters(body.config)}',
      '${username}');`;

    case 'postData':
      return `CALL MILEMARKER.FOXTROT_TASK_POST_POSTDATA(
      ${customerNumber},
      '${body.name}',
      '${body.description}',
      '${JSON.stringify(body.location)}',
      '${escapeSpecialCharacters(body.config)}',
      '${username}');`;

    case 'updateJob':
      return `CALL MILEMARKER.FOXTROT_TASK_POST_UPDATEJOB(
        ${customerNumber},
        '${body.name}',
        '${body.description}',
        '${JSON.stringify(body.location)}',
        '${escapeSpecialCharacters(body.config)}',
        '${username}');`;

    default:
      break;
  }
};

module.exports = {
  generateCreateTaskQuery,
};
