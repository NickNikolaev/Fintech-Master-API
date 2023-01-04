const pick = require('../utils/pick');
const { credentialService } = require('../services');
const catchAsync = require('../utils/catchAsync');

/**
 * Add credential type to req.params
 * @type {(function(*, *, *): void)|*}
 */
const addCredentialTypeToRequestParams = catchAsync(async (req, res, next) => {
  const user = pick(req.user, ['customerNumber', 'username']);
  const params = pick(req.params, ['credentialId']);

  // Get credential by id and Add credential's type to req.params
  const { type } = await credentialService.getCredentialById(user, params);
  req.params.credentialType = type;

  // Next middleware
  return next();
});

/**
 * Validate credential id
 * @type {(function(*, *, *): void)|*}
 */
const validateCredentialId = catchAsync(async (req, res, next) => {
  const user = pick(req.user, ['username']);
  const params = pick(req.params, ['credentialId']);

  // Get credential by id
  await credentialService.getCredentialById(user, params);

  // Next middleware
  return next();
});

module.exports = {
  addCredentialTypeToRequestParams,
  validateCredentialId,
};
