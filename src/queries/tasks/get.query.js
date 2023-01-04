const generateGetAllTasksQuery = (customerNumber) =>
  `SELECT * FROM MILEMARKER.FOXTROT_TASK_GET WHERE "customerNumber" = '${customerNumber}' `;

const generateGetTaskByIdQuery = (customerNumber, taskId) =>
  `SELECT * FROM MILEMARKER.FOXTROT_TASK_GET WHERE "customerNumber" = '${customerNumber}' AND "milemarkerSystemId" = ${taskId}`;

module.exports = {
  generateGetAllTasksQuery,
  generateGetTaskByIdQuery,
};
