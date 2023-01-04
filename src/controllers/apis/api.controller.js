const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const catchAsync = require('../../utils/catchAsync');
const { apiService } = require('../../services');
const mountResponse = require('../../utils/mountResponse');
const apiVersionService = require('../../services/apis/version.api.service');
const { transform } = require('../../models/plugins');
const { apiSchema } = require('../../models');

/**
 * Controller Function: Create api
 * Endpoint: POST /apis
 */
const createApi = catchAsync(async (req, res) => {
  const user = pick(req.user, ['customerNumber', 'username']);
  const body = pick(req.body, ['boxId', 'name', 'url', 'public', 'enabled']);

  // Create api
  const api = await apiService.createApi(user, body);

  // Create api version
  await apiVersionService.createApiVersion(user, { apiId: JSON.parse(api[0].FOXTROT_API_POST).apiId }, body);

  // Return response
  const args = { data: api };
  mountResponse(res, httpStatus.CREATED, args);
});

/**
 * Controller Function: Get all apis
 * Endpoint: GET /apis
 */
const getApis = catchAsync(async (req, res) => {
  const user = pick(req.user, ['customerNumber']);
  const options = pick(req.query, ['size', 'page', 'sortBy', 'orderBy', 'where', 'cache']);
  const filter = pick(req.query, [
    'apiId',
    'milemarkerSystemUuid',
    'boxId',
    'name',
    'description',
    'url',
    'customerNumber',
    'createdBy',
    'createdAt',
    'updatedBy',
  ]);

  // Query apis
  const { results, page, size, totalPages, totalResults, query } = await apiService.queryApis(user, options, filter);

  // Transform api data
  const data = transform(results, apiSchema);

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
 * Controller Function: Get api by id
 * Endpoint: GET /apis/:apiId
 */
const getApi = catchAsync(async (req, res) => {
  const user = pick(req.user, ['customerNumber']);
  const params = pick(req.params, ['apiId']);

  // Get api by id
  const api = await apiService.getApiById(user, params);

  // Transform api data
  const data = transform(api, apiSchema);

  // Return response
  const args = { data };
  mountResponse(res, httpStatus.OK, args);
});

/**
 * Controller Function: Update api by id
 * Endpoint: PUT /apis/:apiId
 */
const updateApi = catchAsync(async (req, res) => {
  const user = pick(req.user, ['customerNumber', 'username']);
  const params = pick(req.params, ['apiId']);
  const body = pick(req.body, ['boxId', 'name', 'url']);

  // Get api by id (to make sure it exists)
  await apiService.getApiById(user, params);

  // Update api by id
  const api = await apiService.updateApiById(user, params, body);

  // Return response
  const args = { data: api };
  mountResponse(res, httpStatus.OK, args);
});

/**
 * Controller Function: Delete api by id
 * Endpoint: DELETE /apis/:apiId
 */
const deleteApi = catchAsync(async (req, res) => {
  const user = pick(req.user, ['username']);
  const params = pick(req.params, ['apiId']);

  // Get api by id (to make sure it exists)
  await apiService.getApiById(user, params);

  // Delete api by id
  await apiService.deleteApiById(user, params);

  // Return no content
  mountResponse(res, httpStatus.NO_CONTENT);
});

module.exports = {
  createApi,
  getApis,
  getApi,
  updateApi,
  deleteApi,
};
