const httpStatus = require('http-status');
const { generateCreateScheduleQuery } = require('../queries/schedules/post.query');
const { executeQuery } = require('../config/snowflake');
const { generateGetAllSchedulesQuery, generateGetScheduleByIdQuery } = require('../queries/schedules/get.query');
const errorMessages = require('../utils/errorMessages');
const ApiError = require('../utils/ApiError');
const { generateUpdateScheduleByIdQuery } = require('../queries/schedules/put.query');
const { generateDeleteScheduleByIdQuery } = require('../queries/schedules/delete.query');
const { paginateSQL } = require('../models/plugins');

const createSchedule = (user, body) => {
  // Generate create schedule query and Execute it
  user.customerNumber = '999999';
  user.username = 'nick';
  const createScheduleQuery = generateCreateScheduleQuery(user.customerNumber, body, user.username || 'milemarker');
  return executeQuery(createScheduleQuery);
};

const querySchedules = (options, filter, user) => {
  // Generate get all schedules query
  user.customerNumber = 999999;
  const getAllSchedulesQuery = generateGetAllSchedulesQuery(user.customerNumber);

  // Paginate the get all schedules query
  return paginateSQL.paginate(options, filter, getAllSchedulesQuery);
};

const getScheduleById = async (user, params) => {
  // Generate get schedule by id query and Execute it
  user.customerNumber = 999999;
  const getScheduleByIdQuery = generateGetScheduleByIdQuery(user.customerNumber, params.scheduleId);
  const schedule = await executeQuery(getScheduleByIdQuery);

  // If schedule is not found -> Throw error
  if (schedule.length === 0) {
    const errorMessage = errorMessages.NOT_FOUND('schedule', params.scheduleId);
    throw new ApiError(httpStatus.NOT_FOUND, errorMessage);
  }

  // Return schedule
  return schedule[0];
};

const updateScheduleById = async (user, params, body) => {
  // Generate update schedule by id query and Execute it
  const updateScheduleByIdQuery = generateUpdateScheduleByIdQuery(
    params.scheduleId,
    user.customerNumber,
    body,
    user.username || 'milemarker'
  );
  return executeQuery(updateScheduleByIdQuery);
};

const deleteScheduleById = async (user, params) => {
  // Generate delete schedule by id query and Execute it
  user.username = 'nick';
  const deleteScheduleByIdQuery = generateDeleteScheduleByIdQuery(params.scheduleId, user.username);
  return executeQuery(deleteScheduleByIdQuery);
};

module.exports = {
  createSchedule,
  querySchedules,
  getScheduleById,
  updateScheduleById,
  deleteScheduleById,
};
