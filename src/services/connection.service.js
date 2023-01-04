const httpStatus = require('http-status');
const {
  generateGetObjectByIdQuery,
  generateGetAllObjectsQuery,
  generateGetAllConnectionObjectsQuery,
  generateGetConnectionObjectByIdQuery,
} = require('../queries/connections/get.query');
const { executeQuery } = require('../config/snowflake');
const errorMessages = require('../utils/errorMessages');
const ApiError = require('../utils/ApiError');
const { paginateSQL } = require('../models/plugins');

/**
 * Query all objects for every connection
 * @returns {Promise | Promise<unknown>}
 */
const queryObjects = (options, filter, user) => {
  // Generate get objects (for every connection) query
  user.customerNumber = 738123;
  const getObjectsQuery = generateGetAllObjectsQuery(user.customerNumber);

  // Paginate the get objects query
  return paginateSQL.paginate(options, filter, getObjectsQuery);
};

const getObjectById = async (user, params) => {
  // Generate get object by id query and Execute it
  user.customerNumber = '738123';
  const getObjectByIdQuery = generateGetObjectByIdQuery(user.customerNumber, params.objectId);
  const object = await executeQuery(getObjectByIdQuery);

  // If object is not found -> Throw error
  if (object.length === 0) {
    const errorMessage = errorMessages.NOT_FOUND('object', params.objectId);
    throw new ApiError(httpStatus.NOT_FOUND, errorMessage);
  }

  // Return object
  return object;
};

/**
 * Get connection objects by connection id
 * @param user
 * @param params
 * @param options
 * @param filter
 * @returns {Promise<void>}
 */
const queryConnectionObjects = async (user, params, options, filter) => {
  // Generate get all connection objects query and Execute it
  user.customerNumber = 738025;
  const getAllConnectionObjectsQuery = generateGetAllConnectionObjectsQuery(user.customerNumber, params.connectionId);
  const connectionObjects = await executeQuery(getAllConnectionObjectsQuery);

  // If connection objects are not found -> Throw error
  if (connectionObjects.length === 0) {
    const errorMessage = errorMessages.NOT_FOUND('connection', params.connectionId);
    throw new ApiError(httpStatus.NOT_FOUND, errorMessage);
  }

  // Paginate get all connection objects query
  return paginateSQL.paginate(options, filter, getAllConnectionObjectsQuery);
};

const getConnectionObjectById = async (user, params) => {
  // Generate get connection object by id query and Execute it
  user.customerNumber = '738025';
  const getObjectByConnectionAndObjectIdQuery = generateGetConnectionObjectByIdQuery(
    user.customerNumber,
    params.connectionId,
    params.objectId
  );
  const connectionObject = await executeQuery(getObjectByConnectionAndObjectIdQuery);

  // If connection object is not found -> Throw error
  if (connectionObject.length === 0) {
    const errorMessage = errorMessages.NOT_FOUND('connection-object', params.objectId);
    throw new ApiError(httpStatus.NOT_FOUND, errorMessage);
  }

  // Return connection object
  return connectionObject[0];
};

module.exports = {
  queryObjects,
  getObjectById,
  queryConnectionObjects,
  getConnectionObjectById,
};
