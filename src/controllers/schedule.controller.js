const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const { scheduleService } = require('../services');
const mountResponse = require('../utils/mountResponse');
const { transform } = require('../models/plugins');
const { scheduleSchema } = require('../models');

/**
 * Controller Function: Create schedule
 * Endpoint: POST /schedules
 */
const createSchedule = catchAsync(async (req, res) => {
  const user = pick(req.user, ['customerNumber', 'username']);
  const body = pick(req.body, ['name', 'description', 'time', 'timeZone']);

  // Create schedule
  const schedule = await scheduleService.createSchedule(user, body);

  // Return response
  const args = { data: schedule };
  mountResponse(res, httpStatus.CREATED, args);
});

/**
 * Controller Function: Get all schedules
 * Endpoint: GET /schedules
 */
const getSchedules = catchAsync(async (req, res) => {
  const options = pick(req.query, ['size', 'page', 'sortBy', 'orderBy', 'where', 'cache']);
  const filter = pick(req.query, [
    'milemarkerSystemId',
    'milemarkerSystemInserted',
    'milemarkerSystemInsertedBy',
    'milemarkerSystemUpdated',
    'milemarkerSystemUpdatedBy',
    'milemarkerSystemUuid',
    'customerNumber',
    'createdBy',
    'tags',
    'name',
    'description',
    'time',
    'timeZone',
  ]);
  const user = pick(req.user, ['customerNumber']);

  // Query schedules
  const { results, size, page, totalPages, totalResults, query } = await scheduleService.querySchedules(
    options,
    filter,
    user
  );

  // Transform schedule data
  const data = transform(results, scheduleSchema);

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
 * Controller Function: Get schedule by id
 * Endpoint: GET /schedules/:scheduleId
 */
const getSchedule = catchAsync(async (req, res) => {
  const user = pick(req.user, ['customerNumber']);
  const params = pick(req.params, ['scheduleId']);

  // Get schedule by id
  const schedule = await scheduleService.getScheduleById(user, params);

  // Transform schedule data
  const data = transform(schedule, scheduleSchema);

  // Return response
  const args = { data };
  mountResponse(res, httpStatus.OK, args);
});

/**
 * Controller Function: Update schedule by id
 * Endpoint: PATCH /schedules/:scheduleId
 */
const updateSchedule = catchAsync(async (req, res) => {
  const user = pick(req.user, ['customerNumber', 'username']);
  const params = pick(req.params, ['scheduleId']);
  const body = pick(req.body, ['name', 'description', 'time', 'timeZone']);

  // Update schedule by id
  const schedule = await scheduleService.updateScheduleById(user, params, body);

  // Return response
  const args = { data: schedule };
  mountResponse(res, httpStatus.OK, args);
});

/**
 * Controller Function: Delete schedule by id
 * Endpoint: DELETE /schedules/:scheduleId
 */
const deleteSchedule = catchAsync(async (req, res) => {
  const user = pick(req.user, ['customerNumber', 'username']);
  const params = pick(req.params, ['scheduleId']);

  // Delete schedule by id
  await scheduleService.deleteScheduleById(user, params);

  // Return no content
  mountResponse(res, httpStatus.NO_CONTENT);
});

module.exports = {
  createSchedule,
  getSchedules,
  getSchedule,
  updateSchedule,
  deleteSchedule,
};
