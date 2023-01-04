const httpStatus = require('http-status');
const { transform } = require('../../models/plugins');
const catchAsync = require('../../utils/catchAsync');
const pick = require('../../utils/pick');
const { apiVersionEndpointService, connectionService } = require('../../services');
const mountResponse = require('../../utils/mountResponse');
const { apiEndpointSchema } = require('../../models');

/**
 * Controller Function: Create api version endpoint
 * Endpoint: POST /apis/:apiId/versions/:versionId/endpoints
 */
const createApiVersionEndpoint = catchAsync(async (req, res) => {
  const user = pick(req.user, ['username']);
  const params = pick(req.params, ['apiId', 'versionId']);
  const body = pick(req.body, ['method', 'objectId', 'url', 'enabled']);

  // TODO: Get the db object by id (to make sure it exists)

  // Create api version endpoint
  const apiVersionEndpoint = await apiVersionEndpointService.createApiVersionEndpoint(user, params, body);

  // Return response
  const args = { data: apiVersionEndpoint };
  mountResponse(res, httpStatus.CREATED, args);
});

/**
 * Controller Function: Get all api version endpoints
 * Endpoint: GET /apis/:apiId/versions/:versionId/endpoints
 */
const getApiVersionEndpoints = catchAsync(async (req, res) => {
  const user = pick(req.user, ['customerNumber']);
  const params = pick(req.params, ['apiId', 'versionId']);
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

  // Query api version endpoints
  const { results, page, size, totalPages, totalResults, query } = await apiVersionEndpointService.queryApiVersionEndpoints(
    user,
    params,
    options,
    filter
  );

  // Transform api version endpoint data
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
 * Controller Function: Get api version endpoint by id
 * Endpoint: GET /apis/:apiId/versions/:versionId/endpoints/:endpointId
 */
const getApiVersionEndpoint = catchAsync(async (req, res) => {
  const user = pick(req.user, ['customerNumber']);
  const params = pick(req.params, ['apiId', 'versionId', 'endpointId']);

  // Get api version endpoint by id
  const apiVersionEndpoint = await apiVersionEndpointService.getApiVersionEndpointById(user, params);

  // Transform api version endpoint data
  const data = transform(apiVersionEndpoint, apiEndpointSchema);

  // Return response
  const args = { data };
  mountResponse(res, httpStatus.OK, args);
});

/**
 * Controller Function: Update api version endpoint by id
 * Endpoint: PUT /apis/:apiId/versions/:versionId/endpoints/:endpointId
 */
const updateApiVersionEndpoint = catchAsync(async (req, res) => {
  const user = pick(req.user, ['username']);
  const params = pick(req.params, ['apiId', 'versionId', 'endpointId']);
  const body = pick(req.body, ['method', 'objectId', 'url', 'enabled']);

  // Get object by id for all connections
  await connectionService.getObjectById(user, { objectId: body.objectId });

  // Update api version endpoint by id
  const apiVersionEndpoint = await apiVersionEndpointService.updateApiVersionEndpointById(user, params, body);

  // Return response
  const args = { data: apiVersionEndpoint };
  mountResponse(res, httpStatus.OK, args);
});

/**
 * Controller Function: Delete api version endpoint by id
 * Endpoint: DELETE /apis/:apiId/versions/:versionId/endpoints/:endpointId
 */
const deleteApiVersionEndpoint = catchAsync(async (req, res) => {
  const user = pick(req.user, ['username']);
  const params = pick(req.params, ['apiId', 'versionId', 'endpointId']);

  // Delete api version endpoint by id
  await apiVersionEndpointService.deleteApiVersionEndpointById(user, params);

  // Return no content
  mountResponse(res, httpStatus.NO_CONTENT);
});

module.exports = {
  createApiVersionEndpoint,
  getApiVersionEndpoints,
  getApiVersionEndpoint,
  updateApiVersionEndpoint,
  deleteApiVersionEndpoint,
};
