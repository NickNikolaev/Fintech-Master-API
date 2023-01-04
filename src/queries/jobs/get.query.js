const generateGetAllJobsQuery = (customerNumber) =>
  `SELECT * FROM MILEMARKER.FOXTROT_JOB_GET WHERE "customerNumber" = '${customerNumber}' `;

const generateGetJobByIdQuery = (customerNumber, jobId) =>
  `SELECT * FROM MILEMARKER.FOXTROT_JOB_GET WHERE "customerNumber" = '${customerNumber}' AND "milemarkerSystemId" = ${jobId} `;

const generateGetJobReportByIdQuery = (customerNumber, jobId) =>
  `SELECT * FROM MILEMARKER.FOXTROT_JOB_GET WHERE "customerNumber" = ${customerNumber} AND "milemarkerSystemId" = ${jobId} `;

module.exports = {
  generateGetAllJobsQuery,
  generateGetJobByIdQuery,
  generateGetJobReportByIdQuery,
};
