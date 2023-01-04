const pick = require('../utils/pick');
const { scheduleService } = require('../services');
const catchAsync = require('../utils/catchAsync');

/**
 * Validate schedule id
 * @type {(function(*, *, *): void)|*}
 */
const validateScheduleId = catchAsync(async (req, res, next) => {
  const user = pick(req.user, ['customerNumber', 'username']);
  const params = pick(req.params, ['scheduleId']);

  // Get schedule by id
  await scheduleService.getScheduleById(user, params);

  // Next middleware
  return next();
});

module.exports = {
  validateScheduleId,
};
