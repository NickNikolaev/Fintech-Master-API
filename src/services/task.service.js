const httpStatus = require('http-status');
const { generateGetAllTasksQuery, generateGetTaskByIdQuery } = require('../queries/tasks/get.query');
const { executeQuery } = require('../config/snowflake');
const { generateUpdateTaskByIdQuery } = require('../queries/tasks/put.query');
const { generateDeleteTaskByIdQuery } = require('../queries/tasks/delete.query');
const { generateCreateTaskQuery } = require('../queries/tasks/post.query');
const { paginateSQL } = require('../models/plugins');
const errorMessages = require('../utils/errorMessages');
const ApiError = require('../utils/ApiError');

const createTask = (user, params, body) => {
  // Generate create task query and Execute it
  user.customerNumber = '999999';
  user.username = 'nick';
  const createTaskQuery = generateCreateTaskQuery(params.taskType, user.customerNumber, body, user.username || 'milemarker');
  console.log('createTaskQuery', createTaskQuery);
  return executeQuery(createTaskQuery);
};

const queryTasks = (options, filter, user) => {
  // Generate get all tasks query
  user.customerNumber = 999999;
  const getAllTasksQuery = generateGetAllTasksQuery(user.customerNumber);

  // Paginate the get all tasks query
  return paginateSQL.paginate(options, filter, getAllTasksQuery);
};

const getTaskById = async (user, params) => {
  // Generate get task by id query and Execute it
  user.customerNumber = 999999;
  const getTaskByIdQuery = generateGetTaskByIdQuery(user.customerNumber, params.taskId);
  const task = await executeQuery(getTaskByIdQuery);

  // If task is not found -> Throw error
  if (task.length === 0) {
    const errorMessage = errorMessages.NOT_FOUND('task', params.taskId);
    throw new ApiError(httpStatus.NOT_FOUND, errorMessage);
  }

  // Return the task
  return task[0];
};

const updateTaskById = async (user, params, body) => {
  // Generate update task by id query and Execute it
  user.customerNumber = '999999';
  user.username = 'nick';
  const updateTaskByIdQuery = generateUpdateTaskByIdQuery(
    params.taskType,
    params.taskId,
    user.customerNumber,
    body,
    user.username || 'milemarker'
  );
  console.log('updateTaskByIdQuery', updateTaskByIdQuery);
  return executeQuery(updateTaskByIdQuery);
};

const deleteTaskById = async (user, params) => {
  // Generate delete task by id query and Execute it
  user.username = 'nick';
  const deleteTaskByIdQuery = generateDeleteTaskByIdQuery(params.taskId, user.username);
  return executeQuery(deleteTaskByIdQuery);
};

module.exports = {
  createTask,
  queryTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
};
