const httpStatus = require('http-status');
const { transform } = require('../models/plugins');
const catchAsync = require('../utils/catchAsync');
const mountResponse = require('../utils/mountResponse');
const { connectionService } = require('../services');
const pick = require('../utils/pick');
const { connectionSchema } = require('../models');

/**
 * Controller Function: Get all objects for every connection
 * Endpoint: GET /connections/objects
 */
const getObjects = catchAsync(async (req, res) => {
  const options = pick(req.query, ['size', 'page', 'sortBy', 'orderBy', 'where', 'cache']);
  const filter = pick(req.query, [
    'boxId',
    'connectionId',
    'columnsJson',
    'customerNumber',
    'dbObjectId',
    'milemarkerSystemUuid',
    'objectType',
    'objectSchema',
    'objectName',
    'parametersJson',
  ]);
  const user = pick(req.user, ['customerNumber']);

  // Query all objects for every connection
  const { results, page, size, totalPages, totalResults, query } = await connectionService.queryObjects(
    options,
    filter,
    user
  );

  // Transform object data
  const data = transform(results, connectionSchema);

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
 * Controller Function: Get object by id for every connection
 * Endpoint: GET /connections/objects/:objectId
 */
const getObject = catchAsync(async (req, res) => {
  const user = pick(req.user, ['customerNumber']);
  const params = pick(req.params, ['objectId']);

  // Get object by id for every connection
  const object = await connectionService.getObjectById(user, params);

  // Transform object data
  const data = transform(object, connectionSchema);

  // Return response
  const args = { data };
  mountResponse(res, httpStatus.OK, args);
});

/**
 * Controller Function: Get all objects for certain connection
 * Endpoint: GET /connections/:connectionId/objects
 */
const getConnectionObjects = catchAsync(async (req, res) => {
  const user = pick(req.user, ['customerNumber']);
  const params = pick(req.params, ['connectionId']);
  const options = pick(req.query, ['size', 'page', 'sortBy', 'orderBy', 'where', 'cache']);
  const filter = pick(req.query, [
    'boxId',
    'connectionId',
    'columnsJson',
    'customerNumber',
    'dbObjectId',
    'milemarkerSystemUuid',
    'objectType',
    'objectSchema',
    'objectName',
    'parametersJson',
  ]);

  // Query connection objects
  const { results, page, size, totalPages, totalResults, query } = await connectionService.queryConnectionObjects(
    user,
    params,
    options,
    filter
  );

  // Transform object data
  const data = transform(results, connectionSchema);

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
 * Controller Function: Get object by id for certain connection
 * Endpoint: GET /connections/:connectionId/objects/:objectId
 */
const getConnectionObject = catchAsync(async (req, res) => {
  const user = pick(req.user, ['customerNumber']);
  const params = pick(req.params, ['connectionId', 'objectId']);

  // Get connection object by id
  const connectionObject = await connectionService.getConnectionObjectById(user, params);

  // Transform connection object data
  const data = transform(connectionObject, connectionSchema);

  // Return response
  const args = { data };
  mountResponse(res, httpStatus.OK, args);
});

module.exports = {
  getObjects,
  getObject,
  getConnectionObjects,
  getConnectionObject,
};
