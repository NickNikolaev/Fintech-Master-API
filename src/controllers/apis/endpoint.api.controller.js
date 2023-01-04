const httpStatus = require('http-status');
const { transform } = require('../../models/plugins');
const catchAsync = require('../../utils/catchAsync');
const pick = require('../../utils/pick');
const { apiEndpointService, connectionService } = require('../../services');
const mountResponse = require('../../utils/mountResponse');
const { apiEndpointSchema } = require('../../models');

/**
 * Controller Function: Get all endpoints for certain api
 * Endpoint: GET /apis/:apiId/endpoints
 */
const getApiEndpoints = catchAsync(async (req, res) => {
  const user = pick(req.user, ['customerNumber']);
  const params = pick(req.params, ['apiId']);
  const options = pick(req.query, ['size', 'page', 'sortBy', 'orderBy', 'where', 'cache']);
  const filter = pick(req.query, [
    'apiEndpointId',
    'milemarkerSystemUuid',
    'apiVersionId',
    'apiId',
    'boxId',
    'customerNumber',
    'method',
    'dbObjectId',
    'dbObjectUrl',
    'enabled',
    'createdBy',
    'updatedBy',
    'createdAt',
    'updatedAt',
  ]);

  // Query api endpoints
  const { results, page, size, totalPages, totalResults, query } = await apiEndpointService.queryApiEndpoints(
    user,
    params,
    options,
    filter
  );

  // Transform api endpoint data
  const data = transform(results, apiEndpointSchema);

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
 * Controller Function: Get api endpoint by id
 * Endpoint: GET /apis/:apiId/endpoints/:endpointId
 */
const getApiEndpoint = catchAsync(async (req, res) => {
  const user = pick(req.user, ['customerNumber']);
  const params = pick(req.params, ['apiId', 'endpointId']);

  // Get api endpoint by id
  const apiEndpoint = await apiEndpointService.getApiEndpointById(user, params);

  // Transform api endpoint data
  const data = transform(apiEndpoint, apiEndpointSchema);

  // Return response
  const args = { data };
  mountResponse(res, httpStatus.OK, args);
});

/**
 * Controller Function: Update api endpoint by id
 * Endpoint: PUT /apis/:apiId/endpoints/:endpointId
 */
const updateApiEndpoint = catchAsync(async (req, res) => {
  const user = pick(req.user, ['customerNumber']);
  const params = pick(req.params, ['apiId', 'endpointId']);
  const body = pick(req.body, ['method', 'objectId', 'url', 'enabled']);

  // Get object by id for all connections
  await connectionService.getObjectById(user, { objectId: body.objectId });

  // Update api endpoint by id
  const endpoint = await apiEndpointService.updateApiEndpointById(user, params, body);

  // Return response
  const args = { data: endpoint };
  mountResponse(res, httpStatus.OK, args);
});

/**
 * Controller Function: Delete api endpoint by id
 * Endpoint: DELETE /apis/:apiId/endpoints/:endpointId
 */
const deleteApiEndpoint = catchAsync(async (req, res) => {
  const user = pick(req.user, ['username']);
  const params = pick(req.params, ['apiId', 'endpointId']);

  // Delete api endpoint by id
  await apiEndpointService.deleteApiEndpointById(user, params);

  // Return no content
  mountResponse(res, httpStatus.NO_CONTENT);
});

module.exports = {
  getApiEndpoints,
  getApiEndpoint,
  updateApiEndpoint,
  deleteApiEndpoint,
};
