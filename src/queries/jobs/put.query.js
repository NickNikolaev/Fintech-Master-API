const escapeSpecialCharacters = require('../../utils/escapeSpecialCharacters');

const generateUpdateJobByIdQuery = (jobId, customerNumber, job, username) =>
  `call MILEMARKER.FOXTROT_JOB_PUT(
  ${jobId},
  ${customerNumber},
  '${job.name}',
  '${escapeSpecialCharacters(job.data)}',
  '${job.type}',
  '${job.priority}',
  '${job.nextRunAt.getTime()}',
  '${job.repeatInterval}',
  '${job.repeatTimeZone}',
  '${job.lastModifiedBy}',
  '${username}')`;

module.exports = {
  generateUpdateJobByIdQuery,
};
