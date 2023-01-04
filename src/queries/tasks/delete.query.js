const generateDeleteTaskByIdQuery = (taskId, username) => `CALL MILEMARKER.FOXTROT_TASK_DELETE(${taskId}, '${username}')`;

module.exports = {
  generateDeleteTaskByIdQuery,
};
