const httpStatus = require('http-status');
const { generateCreateApiVersionEndpointQuery } = require('../../queries/apis/endpoint.version.api/post.query');
const { executeQuery } = require('../../config/snowflake');
const {
  generateGetApiVersionEndpointByIdQuery,
  generateGetAllApiVersionEndpointsQuery,
} = require('../../queries/apis/endpoint.version.api/get.query');
const errorMessages = require('../../utils/errorMessages');
const ApiError = require('../../utils/ApiError');
const { generateUpdateApiVersionEndpointByIdQuery } = require('../../queries/apis/endpoint.version.api/put.query');
const { paginateSQL } = require('../../models/plugins');
const { generateDeleteApiVersionEndpointByIdQuery } = require('../../queries/apis/endpoint.version.api/delete.query');

/**
 * Create an api version endpoint
 * @param params
 * @param body
 * @param user
 * @returns {Promise | Promise<unknown>}
 */
const createApiVersionEndpoint = (user, params, body) => {
  // Generate create api version endpoint query and Execute it
  user.username = 'nick';
  const createApiVersionEndpointQuery = generateCreateApiVersionEndpointQuery(
    params.versionId,
    body.method,
    body.objectId,
    body.url,
    body.enabled,
    user.username
  );
  return executeQuery(createApiVersionEndpointQuery);
};

/**
 * Query api version endpoints
 * @param params
 * @param options
 * @param filter
 * @param user
 * @returns {Promise | Promise<unknown>}
 */
const queryApiVersionEndpoints = (user, params, options, filter) => {
  // Generate get api version endpoints query
  user.customerNumber = 999999;
  const getApiVersionEndpointsQuery = generateGetAllApiVersionEndpointsQuery(
    user.customerNumber,
    params.apiId,
    params.versionId
  );

  // Paginate the api version endpoints query
  return paginateSQL.paginate(options, filter, getApiVersionEndpointsQuery);
};

/**
 * Get api version endpoint by id
 * @param user
 * @param params
 */
const getApiVersionEndpointById = async (user, params) => {
  // Generate get api version endpoint by id query and Execute it
  user.customerNumber = 999999;
  const getApiVersionEndpointByIdQuery = generateGetApiVersionEndpointByIdQuery(
    user.customerNumber,
    params.apiId,
    params.versionId,
    params.endpointId
  );
  const apiVersionEndpoint = await executeQuery(getApiVersionEndpointByIdQuery);

  // If api version endpoint is not found > Throw error
  if (apiVersionEndpoint.length === 0) {
    const errorMessage = errorMessages.NOT_FOUND('api-version-endpoint', params.endpointId);
    throw new ApiError(httpStatus.NOT_FOUND, errorMessage);
  }

  // Return api version endpoint
  return apiVersionEndpoint;
};

/**
 * Update an api version endpoint by id
 * @param params
 * @param body
 * @param user
 */
const updateApiVersionEndpointById = (user, params, body) => {
  // Generate update api version endpoint by id query and Execute it
  user.username = 'nick';
  const updateApiVersionEndpointByIdQuery = generateUpdateApiVersionEndpointByIdQuery(
    params.endpointId,
    params.versionId,
    body.method,
    body.objectId,
    body.url,
    body.enabled,
    user.username
  );
  return executeQuery(updateApiVersionEndpointByIdQuery);
};

const deleteApiVersionEndpointById = (user, params) => {
  // Generate delete api version endpoint by id query and Execute it
  user.username = 'nick';
  const deleteApiVersionEndpointByIdQuery = generateDeleteApiVersionEndpointByIdQuery(params.endpointId, user.username);
  return executeQuery(deleteApiVersionEndpointByIdQuery);
};

module.exports = {
  createApiVersionEndpoint,
  queryApiVersionEndpoints,
  getApiVersionEndpointById,
  updateApiVersionEndpointById,
  deleteApiVersionEndpointById,
};
