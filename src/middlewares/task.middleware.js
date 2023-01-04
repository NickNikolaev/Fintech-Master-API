const pick = require('../utils/pick');
const { taskService, locationService } = require('../services');
const catchAsync = require('../utils/catchAsync');

/**
 * Add task type to req.params
 * @type {(function(*, *, *): void)|*}
 */
const addTaskTypeToRequestParams = catchAsync(async (req, res, next) => {
  const user = pick(req.user, ['customerNumber', 'username']);
  const params = pick(req.params, ['taskId']);

  // Get task by id and Add task's type to req.params
  const { type } = await taskService.getTaskById(user, params);
  req.params.taskType = type;

  // Next middleware
  return next();
});

/**
 * Transform request body for taskType "move", "getData"
 * @type {(function(*, *, *): void)|*}
 */
const transformRequestBody = catchAsync(async (req, res, next) => {
  const params = pick(req.params, ['taskType']);

  // If task's type is "move" or "updateJob" -> Transform req.body.location
  if (params.taskType === 'move' || params.taskType === 'updateJob') req.body.location = { source: req.body.location };

  // Next middleware
  return next();
});

/**
 * Validate task id
 * @type {(function(*, *, *): void)|*}
 */
const validateTaskId = catchAsync(async (req, res, next) => {
  const user = pick(req.user, ['customerNumber', 'username']);
  const params = pick(req.params, ['taskId']);

  // Get task by id
  await taskService.getTaskById(user, params);

  // Next middleware
  return next();
});

/**
 * Validate location id
 * @type {(function(*, *, *): void)|*}
 */
const validateLocationId = catchAsync(async (req, res, next) => {
  const user = pick(req.user, ['customerNumber', 'username']);
  const params = pick(req.params, ['taskType']);
  const body = pick(req.body, ['location', 'file']);

  // If body.location = { source } OR body.location = { source, cache }
  if (body.location && body.location.source) {
    // If task's type is not "updateJob" -> Get location by snowflake id
    if (params.taskType !== 'updateJob') await locationService.getLocationById(user, { locationId: body.location.source });

    // TODO: If task's type is "updateJob" -> Get location by mongo id
  }

  // If task's type is "parse" or "createFile"
  if (params.taskType === 'parse' || params.taskType === 'createFile') {
    // If body.location = { source, cache } -> .xls and .xlsx are not valid formats
    if (body.location.source && body.location.cache) {
      if (body.file.format.includes('.xls') || body.file.format.includes('.xlsx'))
        throw new Error('.xls and .xlsx are not valid format when cache and source are enabled');
    }
  }

  // Next middleware
  return next();
});

module.exports = {
  addTaskTypeToRequestParams,
  transformRequestBody,
  validateTaskId,
  validateLocationId,
};
