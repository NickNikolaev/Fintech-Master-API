const escapeSpecialCharacters = require('../../utils/escapeSpecialCharacters');

const generateCreateJobQuery = (customerNumber, job, username) =>
  `CALL MILEMARKER.FOXTROT_JOB_POST(
  '${customerNumber}',
  '${job.data.name}',
  '${escapeSpecialCharacters(job.data)}',
  '${job.type}',
  ${job.priority || 0},
  ${job.nextRunAt ? `'${new Date(job.nextRunAt).toISOString()}'` : `''`},
  ${job.repeatInterval ? `'${job.repeatInterval}'` : `''`},
  ${job.repeatTimezone ? `'${job.repeatTimezone}'` : `''`},
  '${job.lastModifiedBy || username}',
  '${username}');`;

module.exports = {
  generateCreateJobQuery,
};
