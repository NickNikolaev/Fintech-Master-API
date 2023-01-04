const escapeSpecialCharacters = require('../../utils/escapeSpecialCharacters');

const generateUpdateTaskByIdQuery = (taskType, taskId, customerNumber, body, username) => {
  switch (taskType) {
    case 'move':
      return `CALL MILEMARKER.FOXTROT_TASK_PUT_MOVE(
      ${taskId},
      ${customerNumber},
      '${body.name}',
      '${body.description}',
      '${JSON.stringify(body.location)}',
      '${escapeSpecialCharacters(body.file)}',
      '${escapeSpecialCharacters(body.config)}',
      '${username}');`;

    case 'parse':
      return `CALL MILEMARKER.FOXTROT_TASK_PUT_PARSE(
      ${taskId},
      ${customerNumber},
      '${body.name}',
      '${body.description}',
      '${JSON.stringify(body.location)}',
      '${escapeSpecialCharacters(body.file)}',
      '${escapeSpecialCharacters(body.config)}',
      '${username}');`;

    case 'api':
      return `CALL MILEMARKER.FOXTROT_TASK_PUT_API(
      ${taskId},
      ${customerNumber},
      '${body.name}',
      '${body.description}',
      '${body.getData}',
      '${body.postData}',
      '${username}');`;

    case 'createFile':
      return `CALL MILEMARKER.FOXTROT_TASK_PUT_CREATEFILE(
      ${taskId},
      ${customerNumber},
      '${body.name}',
      '${body.description}',
      '${JSON.stringify(body.location)}',
      '${escapeSpecialCharacters(body.file)}',
      '${escapeSpecialCharacters(body.config)}',
      '${username}');`;

    case 'convertFile':
      return `CALL MILEMARKER.FOXTROT_TASK_PUT_CONVERTFILE(
      ${taskId},
      ${customerNumber},
      '${body.name}',
      '${body.description}',
      '${body.fileType}',
      '${username}');`;

    case 'getFile':
    case 'mojo':
      return `CALL MILEMARKER.FOXTROT_CREDENTIAL_PUT_AWS(
      ${taskId},
      ${customerNumber},
      '${body.name}',
      '${body.description}',
      '${body.key}', 
      '${body.secret}', 
      '${username}');`;

    case 'getData':
      return `CALL MILEMARKER.FOXTROT_TASK_PUT_GETDATA(
      ${taskId},
      ${customerNumber},
      '${body.name}',
      '${body.description}',
      '${JSON.stringify(body.location)}',
      '${escapeSpecialCharacters(body.config)}',
      '${username}');`;

    case 'postData':
      return `CALL MILEMARKER.FOXTROT_TASK_PUT_POSTDATA(
      ${taskId},
      ${customerNumber},
      '${body.name}',
      '${body.description}',
      '${JSON.stringify(body.location)}',
      '${escapeSpecialCharacters(body.config)}',
      '${username}');`;

    case 'updateJob':
      return `CALL MILEMARKER.FOXTROT_TASK_PUT_UPDATEJOB(
        ${taskId},
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
  generateUpdateTaskByIdQuery,
};
