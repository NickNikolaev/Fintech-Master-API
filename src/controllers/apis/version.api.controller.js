const httpStatus = require('http-status');
const { transform } = require('../../models/plugins');
const catchAsync = require('../../utils/catchAsync');
const apiVersionService = require('../../services/apis/version.api.service');
const mountResponse = require('../../utils/mountResponse');
const { apiService } = require('../../services');
const pick = require('../../utils/pick');
const { apiVersionSchema } = require('../../models');

/**
 * Controller Function: Create an api version
 * Endpoint: POST /apis/:apiId/versions
 */
const createApiVersion = catchAsync(async (req, res) => {
  const user = pick(req.user, ['username']);
  const params = pick(req.params, ['apiId']);
  const body = pick(req.body, ['version', 'enabled', 'public']);

  // Get api by id (to make sure it exists)
  await apiService.getApiById(user, params);

  // Create api version
  const apiVersion = await apiVersionService.createApiVersion(user, params, body);

  // Return response
  const args = { data: apiVersion };
  mountResponse(res, httpStatus.CREATED, args);
});

/**
 * Controller Function: Get all api versions
 * Endpoint: GET /apis/:apiId/versions
 */
const getApiVersions = catchAsync(async (req, res) => {
  const params = pick(req.params, ['apiId']);
  const options = pick(req.query, ['size', 'page', 'sortBy', 'orderBy', 'where', 'cache']);
  const filter = pick(req.query, [
    'apiVersionId',
    'milemarkerSystemUuid',
    'apiId',
    'boxId',
    'customerNumber',
    'enabled',
    'public',
    'version',
    'createdBy',
    'createdAt',
    'updatedBy',
  ]);
  const user = pick(req.user, ['customerNumber']);

  // Query api versions
  const apiVersions = await apiVersionService.queryApiVersions(params, options, filter, user);
  const { results, page, size, totalPages, totalResults, query } = apiVersions;

  // Transform api version data
  const data = transform(results, apiVersionSchema);

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
 * Controller Function: Get api version for certain api
 * Endpoint: GET /apis/:apiId/versions/:versionId
 */
const getApiVersion = catchAsync(async (req, res) => {
  const user = pick(req.user, ['customerNumber']);
  const params = pick(req.params, ['apiId', 'versionId']);

  // Get api version by id
  const apiVersion = await apiVersionService.getApiVersionById(user, params);

  // Transform api version data
  const data = transform(apiVersion, apiVersionSchema);

  // Return response
  const args = { data };
  mountResponse(res, httpStatus.OK, args);
});

/**
 * Controller Function: Update api version for certain api
 * Endpoint: PUT /apis/:apiId/versions/:versionId
 */
const updateApiVersion = catchAsync(async (req, res) => {
  const user = pick(req.user, ['username']);
  const params = pick(req.params, ['apiId', 'versionId']);
  const body = pick(req.body, ['enabled', 'public', 'version']);

  // Get api version by id (to make sure it exists)
  await apiVersionService.getApiVersionById(user, params);

  // Update api version by id
  const apiVersion = await apiVersionService.updateApiVersionById(user, params, body);

  // Return response
  const args = { data: apiVersion };
  mountResponse(res, httpStatus.OK, args);
});

/**
 * Controller Function: Delete api version for certain api
 * Endpoint: DELETE /apis/:apiId/versions/:versionId
 */
const deleteApiVersion = catchAsync(async (req, res) => {
  const user = pick(req.user, ['username']);
  const params = pick(req.params, ['apiId', 'versionId']);

  // Get api version by id (to make sure it exists)
  await apiVersionService.getApiVersionById(user, params);

  // Delete api version by api id and version id
  await apiVersionService.deleteApiVersionById(user, params);

  // Return no content
  mountResponse(res, httpStatus.NO_CONTENT);
});

module.exports = {
  createApiVersion,
  getApiVersions,
  getApiVersion,
  updateApiVersion,
  deleteApiVersion,
};
