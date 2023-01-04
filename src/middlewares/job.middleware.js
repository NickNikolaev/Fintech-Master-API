const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const { boxService, scheduleService, taskService } = require('../services');
const jobService = require('../services/job.service');

/**
 * Validate box id
 * @type {(function(*, *, *): void)|*}
 */
const validateBoxId = catchAsync(async (req, res, next) => {
  const user = pick(req.user, ['customerNumber', 'username']);
  const body = pick(req.body, ['boxId']);

  // Get box by id
  await boxService.getBoxById(user, body);

  // Next middleware
  return next();
});

/**
 * Validate task ids
 * @type {(function(*, *, *): void)|*}
 */
const validateTaskIds = catchAsync(async (req, res, next) => {
  const user = pick(req.user, ['customerNumber', 'username']);
  const body = pick(req.body, ['tasks']);

  // Get tasks by id
  // TODO: Not sure if the req.body.tasks should contain snowflake ids ?
  const taskPromises = [];
  body.tasks.forEach((taskId) => {
    // Create task promise, which gets task by id
    const taskPromise = new Promise((resolve, reject) =>
      taskService
        .getTaskById(user, { taskId })
        .then(() => resolve())
        .catch((error) => reject(error))
    );

    // Push task promise to "taskPromises"
    taskPromises.push(taskPromise);
  });

  // Resolve all task promises
  await Promise.all(taskPromises);

  // Next middleware
  return next();
});

/**
 * Validate job id
 * @type {(function(*, *, *): void)|*}
 */
const validateJobId = catchAsync(async (req, res, next) => {
  const user = pick(req.user, ['username', 'customerNumber']);
  const params = pick(req.params, ['jobId']);

  // Get job by id
  await jobService.getJobById(user, params);

  // Next middleware
  return next();
});

/**
 * Validate schedule id
 * @type {(function(*, *, *): void)|*}
 */
const validateScheduleId = catchAsync(async (req, res, next) => {
  const user = pick(req.user, ['username', 'customerNumber']);
  const body = pick(req.body, ['schedule']);

  // Get schedule by id
  await scheduleService.getScheduleById(user, { scheduleId: body.schedule });

  // Next middleware
  return next();
});

module.exports = {
  validateBoxId,
  validateTaskIds,
  validateJobId,
  validateScheduleId,
};
