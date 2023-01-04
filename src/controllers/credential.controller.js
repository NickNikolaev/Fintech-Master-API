const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const mountResponse = require('../utils/mountResponse');
const { credentialService } = require('../services');
const { transform } = require('../models/plugins');
const { credentialSchema } = require('../models');

/**
 * Controller Function: Create credential
 * Endpoint: POST /credentials/:type
 */
const createCredential = catchAsync(async (req, res) => {
  const user = pick(req.user, ['customerNumber', 'username']);
  const params = pick(req.params, ['credentialType']);
  const bodyKeys = ['name', 'description'];
  switch (params.credentialType) {
    case 'ftp':
      bodyKeys.push('username', 'password', 'encryption');
      break;

    case 'google':
      bodyKeys.push('accessToken', 'refreshToken', 'expiryDate');
      break;

    case 'dropbox':
      bodyKeys.push('token');
      break;

    case 'aws':
      bodyKeys.push('key', 'secret');
      break;

    case 'api':
      bodyKeys.push('authentication');
      break;

    default:
      break;
  }
  const body = pick(req.body, bodyKeys);

  // Create credential
  const credential = await credentialService.createCredential(user, params, body);

  // Return response
  const args = { data: credential };
  mountResponse(res, httpStatus.CREATED, args);
});

/**
 * Controller Function: Get all credentials
 * Endpoint: GET /credentials
 */
const getCredentials = catchAsync(async (req, res) => {
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
    'tags',
    'type',
    'username',
    'password',
    'accessToken',
    'refreshToken',
    'expiryDate',
    'token',
    'key',
    'secret',
    'authentication',
  ]);
  const user = pick(req.user, ['customerNumber']);

  // Query credentials
  const { results, page, size, totalPages, totalResults, query } = await credentialService.queryCredentials(
    filter,
    options,
    user
  );

  // Transform credential data
  const data = transform(results, credentialSchema);

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
 * Controller Function: Get credential by id
 * Endpoint: GET /credentials/:credentialId
 */
const getCredential = catchAsync(async (req, res) => {
  const user = pick(req.user, ['customerNumber']);
  const params = pick(req.params, ['credentialId']);

  // Get credential by id
  const credential = await credentialService.getCredentialById(user, params);

  // Transform credential data
  const data = transform(credential, credentialSchema);

  // Return response
  const args = { data };
  mountResponse(res, httpStatus.OK, args);
});

/**
 * Controller Function: Update credential by id
 * Endpoint: PUT /credentials/:credentialId
 */
const updateCredential = catchAsync(async (req, res) => {
  const user = pick(req.user, ['customerNumber', 'username']);
  const params = pick(req.params, ['credentialId', 'credentialType']);
  const bodyKeys = ['name', 'description'];
  switch (params.credentialType) {
    case 'ftp':
      bodyKeys.push('username', 'password', 'encryption');
      break;

    case 'google':
      bodyKeys.push('accessToken', 'refreshToken', 'expiryDate');
      break;

    case 'dropbox':
      bodyKeys.push('token');
      break;

    case 'aws':
      bodyKeys.push('key', 'secret');
      break;

    case 'api':
      bodyKeys.push('authentication');
      break;

    default:
      break;
  }
  const body = pick(req.body, bodyKeys);

  // Update credential by id
  const credential = await credentialService.updateCredentialById(user, params, body);

  // Return response
  const args = { data: credential };
  mountResponse(res, httpStatus.OK, args);
});

/**
 * Controller Function: Delete credential by id
 * Endpoint: DELETE /credentials/:credentialId
 */
const deleteCredential = catchAsync(async (req, res) => {
  const user = pick(req.user, ['username']);
  const params = pick(req.params, ['credentialId']);

  // Delete credential by id
  await credentialService.deleteCredentialById(user, params);

  // Return no content
  mountResponse(res, httpStatus.NO_CONTENT);
});

module.exports = {
  getCredentials,
  getCredential,
  createCredential,
  updateCredential,
  deleteCredential,
};
