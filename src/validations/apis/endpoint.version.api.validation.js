const Joi = require('joi');
const { requestQueryValidation, requestUserValidation } = require('..');

/**
 * Validation Schema: Create api version endpoint
 * Endpoint: POST /apis/:apiId/versions/:versionId/endpoints
 */
const createApiVersionEndpoint = {
  user: Joi.object().keys({
    username: requestUserValidation.username,
  }),
  params: Joi.object().keys({
    apiId: Joi.number().integer().required(),
    versionId: Joi.number().integer().required(),
  }),
  body: Joi.object().keys({
    method: Joi.string().uppercase().valid('GET', 'POST', 'PUT', 'PATCH', 'DELETE').required(),
    objectId: Joi.number().integer().min(1).required(),
    url: Joi.string().required(),
    enabled: Joi.boolean().required(),
  }),
};

/**
 * Validation Schema: Get all api endpoints by apiId and versionId
 * Endpoint: GET /apis/:apiId/versions/:versionId/endpoints
 */
const getApiVersionEndpoints = {
  user: Joi.object().keys({
    customerNumber: requestUserValidation.customerNumber,
  }),
  params: Joi.object().keys({
    apiId: Joi.number().integer().required(),
    versionId: Joi.number().integer().required(),
  }),
  query: Joi.object().keys({
    // Options
    ...requestQueryValidation.options,

    // Filter
    apiEndpointId: Joi.number().integer().min(1),
    milemarkerSystemUuid: Joi.string(),
    apiVersionId: Joi.number().integer().min(1),
    apiId: Joi.number().integer().min(1),
    boxId: Joi.number().integer().min(1),
    customerNumber: Joi.string(),
    method: Joi.string().uppercase().valid('GET', 'POST', 'PUT', 'PATCH', 'DELETE'),
    dbObjectId: Joi.number().integer().min(1),
    dbObjectUrl: Joi.string(),
    enabled: Joi.boolean(),
    createdBy: Joi.string(),
    updatedBy: Joi.string(),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
  }),
};

/**
 * Validation Schema: Get api version endpoint by id
 * Endpoint: GET /apis/:apiId/versions/:versionId/endpoints/:endpointId
 */
const getApiVersionEndpoint = {
  user: Joi.object().keys({
    customerNumber: requestUserValidation.customerNumber,
  }),
  params: Joi.object().keys({
    apiId: Joi.number().integer().required(),
    versionId: Joi.number().integer().required(),
    endpointId: Joi.number().integer().required(),
  }),
};

/**
 * Validation Schema: Update api version endpoint by id
 * Endpoint: PUT /apis/:apiId/versions/:versionId/endpoints/:endpointId
 */
const updateApiVersionEndpoint = {
  user: Joi.object().keys({
    username: requestUserValidation.username,
  }),
  params: Joi.object().keys({
    apiId: Joi.number().integer().required(),
    versionId: Joi.number().integer().required(),
    endpointId: Joi.number().integer().required(),
  }),
  body: Joi.object().keys({
    method: Joi.string().uppercase().valid('GET', 'POST', 'PUT', 'PATCH', 'DELETE').required(),
    objectId: Joi.number().integer().min(1).required(),
    url: Joi.string().required(),
    enabled: Joi.boolean().required(),
  }),
};

/**
 * Validation Schema: Delete api version endpoint by id
 * Endpoint: DELETE /apis/:apiId/versions/:versionId/endpoints/:endpointId
 */
const deleteApiVersionEndpoint = {
  user: Joi.object().keys({
    username: requestUserValidation.username,
  }),
  params: Joi.object().keys({
    apiId: Joi.number().integer().required(),
    versionId: Joi.number().integer().required(),
    endpointId: Joi.number().integer().required(),
  }),
};

module.exports = {
  createApiVersionEndpoint,
  getApiVersionEndpoints,
  getApiVersionEndpoint,
  updateApiVersionEndpoint,
  deleteApiVersionEndpoint,
};
