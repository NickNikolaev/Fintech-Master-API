const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const mountResponse = require('../utils/mountResponse');
const { locationService } = require('../services');
const { transform } = require('../models/plugins');
const { locationSchema } = require('../models');

/**
 * Controller Function: Create location
 * Endpoint: POST /locations/:locationType
 */
const createLocation = catchAsync(async (req, res) => {
  const user = pick(req.user, ['customerNumber', 'username']);
  const params = pick(req.params, ['locationType']);
  const bodyKeys = ['name', 'description'];
  switch (params.locationType) {
    case 'ftp':
      bodyKeys.push('host', 'port', 'protocol', 'credentials', 'folder');
      break;

    case 'google':
    case 'dropbox':
      bodyKeys.push('credentials');
      break;

    case 'api':
      bodyKeys.push('credentials', 'endpoint', 'method', 'dataObject', 'timeout', 'config');
      break;

    case 'db-connection':
      bodyKeys.push('object');
      break;

    default:
      break;
  }
  const body = pick(req.body, bodyKeys);

  // Create location
  const location = await locationService.createLocation(params, user, body);

  // Return response
  const args = { data: location };
  mountResponse(res, httpStatus.CREATED, args);
});

/**
 * Controller Function: Create AWS location
 * Endpoint: POST /locations/aws/:locationType
 */
const createAWSLocation = catchAsync(async (req, res) => {
  const user = pick(req.user, ['customerNumber', 'username']);
  const params = pick(req.params, ['locationType']);
  const bodyKeys = ['name', 'description', 'credentials'];
  switch (params.locationType) {
    case 's3':
      bodyKeys.push('bucket', 'region', 'bucketFolder');
      break;

    case 'dynamo':
      bodyKeys.push('table', 'region');
      break;

    case 'glacier':
      bodyKeys.push('vault', 'region');
      break;

    case 'redshift':
      bodyKeys.push('username', 'password', 'database', 'port', 'host');
      break;

    default:
      break;
  }
  const body = pick(req.body, bodyKeys);

  // Create AWS location
  const awsLocation = await locationService.createAWSLocation(user, params, body);

  // Return response
  const args = { data: awsLocation };
  mountResponse(res, httpStatus.CREATED, args);
});

/**
 * Controller Function: Get all locations
 * Endpoint: GET /locations
 */
const getLocations = catchAsync(async (req, res) => {
  const user = pick(req.user, ['customerNumber']);
  const options = pick(req.query, ['size', 'page', 'sortBy', 'orderBy', 'where', 'cache']);
  const filter = pick(req.query, [
    'milemarkerSystemId',
    'milemarkerSystemInserted',
    'milemarkerSystemInsertedBy',
    'milemarkerSystemUpdated',
    'milemarkerSystemUpdatedBy',
    'milemarkerSystemUuid',
    'customerNumber',
    'name',
    'description',
    'type',
    'host',
    'port',
    'protocol',
    'credentials',
    'bucket',
    'region',
    'endpoint',
    'method',
    'dataObject',
    'vault',
    'table',
    'username',
    'password',
    'database',
    'object',
    'timeout',
  ]);

  // Query locations
  const { results, size, page, totalPages, totalResults, query } = await locationService.queryLocations(
    filter,
    options,
    user
  );

  // Transform location data
  const data = transform(results, locationSchema);

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
 * Controller Function: Get location by id
 * Endpoint: GET /locations/:locationId
 */
const getLocation = catchAsync(async (req, res) => {
  const user = pick(req.user, ['customerNumber']);
  const params = pick(req.params, ['locationId']);

  // Get location by id
  const location = await locationService.getLocationById(user, params);

  // Transform location data
  const data = transform(location, locationSchema);

  // Return response
  const args = { data };
  mountResponse(res, httpStatus.OK, args);
});

/**
 * Controller Function: Update location by id
 * Endpoint: PUT /locations/:locationId
 */
const updateLocation = catchAsync(async (req, res) => {
  const user = pick(req.user, ['customerNumber', 'username']);
  const params = pick(req.params, ['locationId', 'locationType']);
  const bodyKeys = ['name', 'description'];
  switch (params.locationType) {
    case 'ftp':
      bodyKeys.push('host', 'port', 'protocol', 'credentials', 'folder');
      break;

    case 'google':
    case 'dropbox':
      bodyKeys.push('credentials');
      break;

    case 'api':
      bodyKeys.push('credentials', 'endpoint', 'method', 'dataObject', 'timeout', 'config');
      break;

    case 'dbConnection':
      bodyKeys.push('object');
      break;

    case 's3':
      bodyKeys.push('credentials', 'bucket', 'region', 'bucketFolder');
      break;

    case 'glacier':
      bodyKeys.push('credentials', 'vault', 'region');
      break;

    case 'dynamo':
      bodyKeys.push('credentials', 'table', 'region');
      break;

    case 'redshift':
      bodyKeys.push('credentials', 'username', 'password', 'database', 'port', 'host');
      break;

    default:
      break;
  }
  const body = pick(req.body, bodyKeys);

  // Update location by id
  const location = await locationService.updateLocationById(user, params, body);

  // Return response
  const args = { data: location };
  mountResponse(res, httpStatus.OK, args);
});

/**
 * Controller Function: Delete location by id
 * Endpoint: DELETE /locations/:locationId
 */
const deleteLocation = catchAsync(async (req, res) => {
  const user = pick(req.user, ['customerNumber', 'username']);
  const params = pick(req.params, ['locationId']);

  // Delete location by id
  await locationService.deleteLocationById(user, params);

  // Return no content
  mountResponse(res, httpStatus.NO_CONTENT);
});

module.exports = {
  createLocation,
  createAWSLocation,
  getLocations,
  getLocation,
  updateLocation,
  deleteLocation,
};
