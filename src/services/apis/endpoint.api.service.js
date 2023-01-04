const httpStatus = require('http-status');
const {
  generateGetApiEndpointByIdQuery,
  generateGetAllApiEndpointsQuery,
} = require('../../queries/apis/endpoint.api/get.query');
const { executeQuery } = require('../../config/snowflake');
const errorMessages = require('../../utils/errorMessages');
const ApiError = require('../../utils/ApiError');
const { paginateSQL } = require('../../models/plugins');
const { generateUpdateApiEndpointByIdQuery } = require('../../queries/apis/endpoint.api/put.query');
const { generateDeleteApiEndpointByIdQuery } = require('../../queries/apis/endpoint.api/delete.query');

/**
 * Query api endpoints
 * @param params
 * @param options
 * @param filter
 * @param user
 */
const queryApiEndpoints = (user, params, options, filter) => {
  // Generate get api endpoints query
  user.customerNumber = 999999;
  const getApiEndpointsQuery = generateGetAllApiEndpointsQuery(user.customerNumber, params.apiId);

  // Paginate the get api endpoints query
  return paginateSQL.paginate(options, filter, getApiEndpointsQuery);
};

/**
 * Get api endpoint by id
 * @param params
 * @param user
 */
const getApiEndpointById = async (user, params) => {
  // Generate get api endpoint by id query and Execute it
  user.customerNumber = 999999;
  const getApiEndpointByIdQuery = generateGetApiEndpointByIdQuery(user.customerNumber, params.apiId, params.endpointId);
  const apiEndpoint = await executeQuery(getApiEndpointByIdQuery);

  // If api endpoint is not found -> Throw error
  if (apiEndpoint.length === 0) {
    const errorMessage = errorMessages.NOT_FOUND('api-endpoint', params.endpointId);
    throw new ApiError(httpStatus.NOT_FOUND, errorMessage);
  }

  // Return api endpoint
  return apiEndpoint;
};

/**
 * Update api endpoint by id
 * @param user
 * @param params
 * @param body
 * @returns {Promise | Promise<unknown>}
 */
const updateApiEndpointById = (user, params, body) => {
  // Generate update api endpoint by id query and Execute it
  user.username = 'nick';
  const updateApiEndpointByIdQuery = generateUpdateApiEndpointByIdQuery(
    params.apiId,
    params.endpointId,
    body.method,
    body.objectId,
    body.url,
    body.enabled,
    user.username
  );
  return executeQuery(updateApiEndpointByIdQuery);
};

/**
 * Delete api endpoint by id
 * @param user
 * @param params
 * @returns {Promise | Promise<unknown>}
 */
const deleteApiEndpointById = (user, params) => {
  // Generate delete api endpoint by id query and Execute it
  user.username = 'nick';
  const deleteApiEndpointByIdQuery = generateDeleteApiEndpointByIdQuery(params.endpointId, user.username);
  return executeQuery(deleteApiEndpointByIdQuery);
};

module.exports = {
  queryApiEndpoints,
  getApiEndpointById,
  updateApiEndpointById,
  deleteApiEndpointById,
};
