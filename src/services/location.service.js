const httpStatus = require('http-status');
const { generateGetAllLocationsQuery, generateGetLocationByIdQuery } = require('../queries/locations/get.query');
const { executeQuery } = require('../config/snowflake');
const errorMessages = require('../utils/errorMessages');
const ApiError = require('../utils/ApiError');
const { generateUpdateLocationByIdQuery } = require('../queries/locations/put.query');
const { generateDeleteLocationByIdQuery } = require('../queries/locations/delete.query');
const { generateCreateLocationQuery, generateCreateAWSLocationQuery } = require('../queries/locations/post.query');
const { paginateSQL } = require('../models/plugins');

/**
 * Create a location
 * @param params
 * @param user
 * @param body
 * @return {Promise<void>}
 */
const createLocation = async (params, user, body) => {
  // Generate create location query and Execute it
  user.customerNumber = '999999';
  user.username = 'nick';
  const createLocationQuery = generateCreateLocationQuery(
    params.locationType,
    user.customerNumber,
    body,
    user.username || 'milemarker'
  );
  return executeQuery(createLocationQuery);
};

const createAWSLocation = (user, params, body) => {
  // Generate create AWS location query and Execute it
  user.customerNumber = '999999';
  user.username = 'nick';
  const createAWSLocationQuery = generateCreateAWSLocationQuery(
    params.locationType,
    user.customerNumber,
    body,
    user.username || 'milemarker'
  );
  return executeQuery(createAWSLocationQuery);
};

/**
 * Query for locations
 * @param filter
 * @param options
 * @param user
 * @return {Promise<unknown>}
 */
const queryLocations = async (filter, options, user) => {
  // Generate get all locations query
  user.customerNumber = 999999;
  const getAllLocationsQuery = generateGetAllLocationsQuery(user.customerNumber);

  // Paginate the get all locations query
  return paginateSQL.paginate(options, filter, getAllLocationsQuery);
};

/**
 * Get location by id
 * @param params
 * @param user
 * @return {Promise<void>}
 */
const getLocationById = async (user, params) => {
  // Get location by id
  user.customerNumber = 999999;
  const getLocationByIdQuery = generateGetLocationByIdQuery(user.customerNumber, params.locationId);
  const location = await executeQuery(getLocationByIdQuery);

  // If location is not found -> Throw error
  if (location.length === 0) {
    const errorMessage = errorMessages.NOT_FOUND('location', params.locationId);
    throw new ApiError(httpStatus.NOT_FOUND, errorMessage);
  }

  // Return location
  return location[0];
};

/**
 * Update location by id
 * @param params
 * @param user
 * @param body
 * @return {Promise<void>}
 */
const updateLocationById = async (user, params, body) => {
  // Generate update location query and Execute it
  user.customerNumber = 999999;
  user.username = 'nick';
  const updateLocationQuery = generateUpdateLocationByIdQuery(
    params.locationType,
    params.locationId,
    user.customerNumber,
    body,
    user.username || 'milemarker'
  );
  console.log('updateLocationQuery', updateLocationQuery);
  return executeQuery(updateLocationQuery);
};

/**
 * Delete location by id
 * @param params
 * @param user
 * @return {Promise<unknown>}
 */
const deleteLocationById = async (user, params) => {
  // Generate delete location by id query and Execute it
  user.username = 'nick';
  const deleteLocationByIdQuery = generateDeleteLocationByIdQuery(params.locationId, user.username);
  return executeQuery(deleteLocationByIdQuery);
};

module.exports = {
  createLocation,
  createAWSLocation,
  queryLocations,
  getLocationById,
  updateLocationById,
  deleteLocationById,
};
