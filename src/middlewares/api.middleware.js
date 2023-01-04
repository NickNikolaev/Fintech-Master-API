const { apiService, apiVersionService, apiVersionEndpointService, apiEndpointService } = require('../services');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');

/**
 * Validate API id
 * @type {(function(*, *, *): void)|*}
 */
const validateApiId = catchAsync(async (req, res, next) => {
  const user = pick(req.user, ['customerNumber']);
  const params = pick(req.params, ['apiId']);

  // Get api by id
  await apiService.getApiById(user, params);

  // Next middleware
  return next();
});

/**
 * Validate API version id
 * @type {(function(*, *, *): void)|*}
 */
const validateApiVersionId = catchAsync(async (req, res, next) => {
  const user = pick(req.user, ['customerNumber']);
  const params = pick(req.params, ['apiId', 'versionId']);

  // Get api version by id
  await apiVersionService.getApiVersionById(user, params);

  // Next middleware
  return next();
});

/**
 * Validate API version endpoint id
 * @type {(function(*, *, *): void)|*}
 */
const validateApiVersionEndpointId = catchAsync(async (req, res, next) => {
  const user = pick(req.user, ['username']);
  const params = pick(req.params, ['apiId', 'versionId', 'endpointId']);

  // Get api version endpoint by id
  await apiVersionEndpointService.getApiVersionEndpointById(user, params);

  // Next middleware
  return next();
});

/**
 * Validate API endpoint id
 * @type {(function(*, *, *): void)|*}
 */
const validateApiEndpointId = catchAsync(async (req, res, next) => {
  const user = pick(req.user, ['customerNumber']);
  const params = pick(req.params, ['apiId', 'endpointId']);

  // Get api endpoint by id
  await apiEndpointService.getApiEndpointById(user, params);

  // Next middleware
  return next();
});

module.exports = {
  validateApiId,
  validateApiVersionId,
  validateApiVersionEndpointId,
  validateApiEndpointId,
};
