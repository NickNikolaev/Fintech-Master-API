const httpStatus = require('http-status');
const { executeQuery } = require('../../config/snowflake');
const {
  generateGetAllApiVersionsQuery,
  generateGetApiVersionByIdQuery,
} = require('../../queries/apis/version.api/get.query');
const { generateCreateApiVersionQuery } = require('../../queries/apis/version.api/post.query');
const { generateUpdateApiVersionByIdQuery } = require('../../queries/apis/version.api/put.query');
const { paginateSQL } = require('../../models/plugins');
const errorMessages = require('../../utils/errorMessages');
const ApiError = require('../../utils/ApiError');
const { generateDeleteApiVersionByIdQuery } = require('../../queries/apis/version.api/delete.query');

const createApiVersion = (user, params, body) => {
  // Generate create api version by id query and Execute it
  user.username = 'nick';
  const createApiVersionByIdQuery = generateCreateApiVersionQuery(
    params.apiId,
    user.username,
    body.enabled,
    body.public,
    body.version || 1
  );
  return executeQuery(createApiVersionByIdQuery);
};

/**
 * Query for api versions
 * @returns {Promise<QueryResult>}
 */
const queryApiVersions = (params, options, filter, user) => {
  // Generate get all api versions query
  user.customerNumber = 999999;
  const getAllApiVersionsQuery = generateGetAllApiVersionsQuery(user.customerNumber, params.apiId);

  // Paginate the get all api versions query
  return paginateSQL.paginate(options, filter, getAllApiVersionsQuery);
};

/**
 * Get api version by id
 * @param params
 * @param user
 * @returns {Promise<void>}
 */
const getApiVersionById = async (user, params) => {
  // Get an api version by id
  user.customerNumber = 999999;
  const getApiVersionByIdQuery = generateGetApiVersionByIdQuery(user.customerNumber, params.apiId, params.versionId);
  const apiVersion = await executeQuery(getApiVersionByIdQuery);

  // If api version is not found -> Throw error
  if (apiVersion.length === 0) {
    const errorMessage = errorMessages.NOT_FOUND('api-version', params.versionId);
    throw new ApiError(httpStatus.BAD_REQUEST, errorMessage);
  }

  // Return api version
  return apiVersion;
};

/**
 * Update an api version by id
 * @param params
 * @param user
 * @param body
 * @returns {Promise<void>}
 */
const updateApiVersionById = async (user, params, body) => {
  // Generate update api version by id query and Execute it
  user.username = 'nick';
  const updateApiVersionByIdQuery = generateUpdateApiVersionByIdQuery(
    params.versionId,
    user.username,
    body.enabled,
    body.public,
    body.version
  );
  return executeQuery(updateApiVersionByIdQuery);
};

const deleteApiVersionById = (user, params) => {
  // Generate delete api version by id query and Execute it
  user.username = 'nick';
  const deleteApiVersionByIdQuery = generateDeleteApiVersionByIdQuery(params.versionId, user.username);
  return executeQuery(deleteApiVersionByIdQuery);
};

module.exports = {
  createApiVersion,
  queryApiVersions,
  getApiVersionById,
  updateApiVersionById,
  deleteApiVersionById,
};
