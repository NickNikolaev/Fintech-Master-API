const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { tenancyService } = require('../services');

/**
 * Controller Function: Get tenancy
 * Endpoint: POST /tenancy
 * @type {(function(*=, *=, *=): void)|*}
 */
const getTenancy = catchAsync(async (req, res) => {
  const body = pick(req.body, ['domain']);

  // Query tenancy
  const tenancy = await tenancyService.queryTenancy(body);

  // Return response
  res.send({
    success: true,
    data: tenancy,
  });
});

module.exports = {
  getTenancy,
};
