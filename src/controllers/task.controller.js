const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { taskService } = require('../services');
const pick = require('../utils/pick');
const mountResponse = require('../utils/mountResponse');
const { transform } = require('../models/plugins');
const { taskSchema } = require('../models');

/**
 * Controller Function: Create task
 * Endpoint: POST /tasks/:taskType
 */
const createTask = catchAsync(async (req, res) => {
  const user = pick(req.user, ['username', 'customerNumber']);
  const params = pick(req.params, ['taskType']);
  const bodyKeys = ['name', 'description'];
  switch (params.taskType) {
    case 'move':
      bodyKeys.push('location', 'file', 'config');
      break;

    case 'parse':
      bodyKeys.push('location', 'file', 'config');
      break;

    case 'api':
      bodyKeys.push('getData', 'postData');
      break;

    case 'createFile':
      bodyKeys.push('location', 'file', 'config');
      break;

    case 'convertFile':
      bodyKeys.push('fileType');
      break;

    case 'getFile':
    case 'mojo':
      bodyKeys.push('key', 'secret');
      break;

    case 'getData':
    case 'postData':
    case 'updateJob':
      bodyKeys.push('location', 'config');
      break;

    default:
      break;
  }
  const body = pick(req.body, bodyKeys);

  // Create task
  const task = await taskService.createTask(user, params, body);

  // Return response
  const args = { data: task };
  mountResponse(res, httpStatus.CREATED, args);
});

/**
 * Controller Function: Get all tasks
 * Endpoint: GET /tasks
 */
const getTasks = catchAsync(async (req, res) => {
  const options = pick(req.query, ['size', 'page', 'sortBy', 'orderBy', 'where', 'cache']);
  const filter = pick(req.query, [
    'milemarkerSystemId',
    'milemarkerSystemInserted',
    'milemarkerSystemInsertedBy',
    'milemarkerSystemUpdated',
    'milemarkerSystemUpdatedBy',
    'milemarkerSystemUuid',
    'customerNumber',
    'type',
    'createdBy',
    'tags',
    'name',
    'description',
    'location',
    'fileType',
    'filter',
    'rename',
    'url',
    'folder',
    'config',
    'getData',
    'postData',
    'file',
    'quotechar',
    'delimiter',
    'header',
    'newLine',
    'sheet',
    'map',
    'urlMap',
  ]);
  const user = pick(req.user, ['customerNumber']);

  // Query tasks
  const { results, page, size, totalPages, totalResults, query } = await taskService.queryTasks(options, filter, user);

  // Transform task data
  const data = transform(results, taskSchema);

  // Return response
  const args = {
    data,
    summary: {
      page,
      size,
      totalPages,
      totalResults,
    },
    metaData: { query },
  };
  mountResponse(res, httpStatus.OK, args);
});

/**
 * Controller Function: Get task by id
 * Endpoint: GET /tasks/:taskId
 */
const getTask = catchAsync(async (req, res) => {
  const user = pick(req.user, ['customerNumber']);
  const params = pick(req.params, ['taskId']);

  // Get task by id
  const task = await taskService.getTaskById(user, params);

  // Transform task data
  const data = transform(task, taskSchema);

  // Return response
  const args = { data };
  mountResponse(res, httpStatus.OK, args);
});

/**
 * Controller Function: Update task by id
 * Endpoint: PUT /tasks/:taskId
 */
const updateTask = catchAsync(async (req, res) => {
  const user = pick(req.user, ['customerNumber', 'username']);
  const params = pick(req.params, ['taskId', 'taskType']);
  const bodyKeys = ['name', 'description'];
  switch (params.taskType) {
    case 'move':
      bodyKeys.push('location', 'file', 'config');
      break;

    case 'parse':
      bodyKeys.push('location', 'file', 'config');
      break;

    case 'api':
      bodyKeys.push('getData', 'postData');
      break;

    case 'createFile':
      bodyKeys.push('location', 'file', 'config');
      break;

    case 'convertFile':
      bodyKeys.push('fileType');
      break;

    case 'getFile':
    case 'mojo':
      bodyKeys.push('key', 'secret');
      break;

    case 'getData':
    case 'postData':
    case 'updateJob':
      bodyKeys.push('location', 'config');
      break;

    default:
      break;
  }
  const body = pick(req.body, bodyKeys);

  // Update task by id
  const task = await taskService.updateTaskById(user, params, body);

  // Return response
  const args = { data: task };
  mountResponse(res, httpStatus.OK, args);
});

/**
 * Controller Function: Delete task by id
 * Endpoint: DELETE /tasks/:taskId
 */
const deleteTask = catchAsync(async (req, res) => {
  const user = pick(req.user, ['customerNumber', 'username']);
  const params = pick(req.params, ['taskId']);

  // Delete task by id
  await taskService.deleteTaskById(user, params);

  // Return no content
  mountResponse(res, httpStatus.NO_CONTENT);
});

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
};
