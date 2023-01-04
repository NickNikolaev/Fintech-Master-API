const httpStatus = require('http-status');
const { generateDeleteCredentialByIdQuery } = require('../queries/credentials/delete.query');
const { generateGetAllCredentialsQuery, generateGetCredentialByIdQuery } = require('../queries/credentials/get.query');
const { executeQuery } = require('../config/snowflake');
const errorMessages = require('../utils/errorMessages');
const ApiError = require('../utils/ApiError');
const { generateUpdateCredentialByIdQuery } = require('../queries/credentials/put.query');
const { generateCreateCredentialQuery } = require('../queries/credentials/post.query');
const { paginateSQL } = require('../models/plugins');

/**
 * Create a credential
 * @param params
 * @param user
 * @param body
 * @return {Promise<unknown>}
 */
const createCredential = async (user, params, body) => {
  // Generate create credential query and Execute it
  user.customerNumber = '999999';
  user.username = 'nick';
  const createCredentialQuery = generateCreateCredentialQuery(
    params.credentialType,
    user.customerNumber,
    body,
    user.username || 'milemarker'
  );
  return executeQuery(createCredentialQuery);
};

/**
 * Query all credentials from Snowflake
 * @param filter
 * @param options
 * @return {Promise | Promise<unknown>}
 */
const queryCredentials = (filter, options, user) => {
  // Generate get all credentials query
  user.customerNumber = 999999;
  const getAllCredentialsQuery = generateGetAllCredentialsQuery(user.customerNumber);

  // Paginate the get all credentials query
  return paginateSQL.paginate(options, filter, getAllCredentialsQuery);
};

/**
 * Get credential by id
 * @param params
 * @param user
 * @return {Promise<void>}
 */
const getCredentialById = async (user, params) => {
  // Generate get credential by id query and Execute it
  user.customerNumber = 999999;
  const getCredentialByIdQuery = generateGetCredentialByIdQuery(user.customerNumber, params.credentialId);
  const credential = await executeQuery(getCredentialByIdQuery);

  // If credential is not found -> Throw error
  if (credential.length === 0) {
    const errorMessage = errorMessages.NOT_FOUND('credential', params.credentialId);
    throw new ApiError(httpStatus.NOT_FOUND, errorMessage);
  }

  // Return credential
  return credential[0];
};

/**
 * Update credential by id
 * @param params
 * @param user
 * @param body
 * @return {Promise<void>}
 */
const updateCredentialById = async (user, params, body) => {
  // Generate update credential by id query and Execute it
  user.customerNumber = 999999;
  user.username = 'nick';
  const updateCredentialsQuery = generateUpdateCredentialByIdQuery(
    params.credentialType,
    params.credentialId,
    user.customerNumber,
    body,
    user.username || 'milemarker'
  );
  return executeQuery(updateCredentialsQuery);
};

/**
 * Delete credential by id
 * @param user
 * @param params
 * @returns {Promise | Promise<unknown>}
 */
const deleteCredentialById = (user, params) => {
  // Generate delete credential by id query and Execute it
  user.username = 'nick';
  const deleteCredentialByIdQuery = generateDeleteCredentialByIdQuery(params.credentialId, user.username);
  return executeQuery(deleteCredentialByIdQuery);
};

module.exports = {
  createCredential,
  queryCredentials,
  getCredentialById,
  updateCredentialById,
  deleteCredentialById,
};
