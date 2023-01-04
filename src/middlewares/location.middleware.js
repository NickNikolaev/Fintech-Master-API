const pick = require('../utils/pick');
const { locationService, credentialService } = require('../services');
const catchAsync = require('../utils/catchAsync');

/**
 * Add location type to req.params
 * @type {(function(*, *, *): void)|*}
 */
const addLocationTypeToRequestParams = catchAsync(async (req, res, next) => {
  const user = pick(req.user, ['customerNumber', 'username']);
  const params = pick(req.params, ['locationId']);

  // Get location by id and Add location's type to req.params
  const { type } = await locationService.getLocationById(user, params);
  req.params.locationType = type;

  // Next middleware
  return next();
});

/**
 * Validate location id
 * @type {(function(*, *, *): void)|*}
 */
const validateLocationId = catchAsync(async (req, res, next) => {
  const user = pick(req.user, ['customerNumber', 'username']);
  const params = pick(req.params, ['locationId']);

  // Get location by id
  await locationService.getLocationById(user, params);

  // Next middleware
  return next();
});

/**
 * Validate credential id
 * @type {(function(*, *, *): void)|*}
 */
const validateCredentialId = catchAsync(async (req, res, next) => {
  const user = pick(req.user, ['customerNumber', 'username']);
  const body = pick(req.body, ['credentials']);

  // If req.body.credentials -> Get credential by id
  if (body.credentials) await credentialService.getCredentialById(user, { credentialId: body.credentials });

  // Next middleware
  return next();
});

module.exports = {
  addLocationTypeToRequestParams,
  validateLocationId,
  validateCredentialId,
};
