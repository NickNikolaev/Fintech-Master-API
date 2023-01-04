const httpStatus = require('http-status');
const ApiError = require('../../utils/ApiError');
const { generateGetAllApisQuery, generateGetApiByIdQuery } = require('../../queries/apis/api/get.query');
const { executeQuery } = require('../../config/snowflake');
const { generateCreateApiQuery } = require('../../queries/apis/api/post.query');
const { generateUpdateApiByIdQuery } = require('../../queries/apis/api/put.query');
const { paginateSQL } = require('../../models/plugins');
const errorMessages = require('../../utils/errorMessages');
const { generateDeleteApiByIdQuery } = require('../../queries/apis/api/delete.query');

/**
 * Create api
 * @param {Object} body
 * @param {Object} user
 * @returns {Promise<User>}
 */
const createApi = async (user, body) => {
  // Generate create api query and Execute it
  user.customerNumber = 999999;
  user.username = 'nick';
  const createApiQuery = generateCreateApiQuery(user.customerNumber, body.boxId, body.name, body.url, user.username);
  return executeQuery(createApiQuery);
};

/**
 * Query for apis
 * @param options
 * @param filter
 * @param user
 * @returns {Promise<QueryResult>}
 */
const queryApis = async (user, options, filter) => {
  // Generate get all apis query
  user.customerNumber = 999999;
  const getAllApisQuery = generateGetAllApisQuery(user.customerNumber);

  // Paginate the get all apis query
  return paginateSQL.paginate(options, filter, getAllApisQuery);
};

/**
 * Get api by id
 * @param user
 * @param params
 * @returns {Promise<*>}
 */
const getApiById = async (user, params) => {
  // Generate get api by id query and Execute it
  user.customerNumber = 999999;
  const getApiByIdQuery = generateGetApiByIdQuery(user.customerNumber, params.apiId);
  const api = await executeQuery(getApiByIdQuery);

  // If api is not found -> Throw error
  if (api.length === 0) {
    const errorMessage = errorMessages.NOT_FOUND('api', params.apiId);
    throw new ApiError(httpStatus.NOT_FOUND, errorMessage);
  }

  // Return api
  return api[0];
};

/**
 * Update api by id
 * @param params
 * @param body
 * @param user
 * @returns {Promise<void>}
 */
const updateApiById = async (user, params, body) => {
  user.customerNumber = '999999';
  user.username = 'nick';
  const updateApiByIdQuery = generateUpdateApiByIdQuery(
    params.apiId,
    user.customerNumber,
    body.boxId,
    body.name,
    body.url,
    user.username
  );
  return executeQuery(updateApiByIdQuery);
};

/**
 * Delete api by id
 * @param user
 * @param params
 * @returns {Promise | Promise<unknown>}
 */
const deleteApiById = (user, params) => {
  // Generate delete api by id query and Execute it
  user.username = 'nick';
  const deleteApiByIdQuery = generateDeleteApiByIdQuery(params.apiId, user.username);
  return executeQuery(deleteApiByIdQuery);
};

module.exports = {
  createApi,
  queryApis,
  getApiById,
  updateApiById,
  deleteApiById,
};
