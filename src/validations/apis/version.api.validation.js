const Joi = require('joi');
const { requestQueryValidation, requestUserValidation } = require('..');

/**
 * Validation Schema: Create api version for certain api
 * Endpoint: POST /apis/:apiId/versions
 */
const createApiVersion = {
  user: Joi.object().keys({
    username: requestUserValidation.username,
  }),
  params: Joi.object().keys({
    apiId: Joi.number().integer().required(),
  }),
  body: Joi.object().keys({
    version: Joi.number().integer().min(1).required(),
    enabled: Joi.boolean().required(),
    public: Joi.boolean().required(),
  }),
};

/**
 * Validation Schema: Get all api versions for certain api
 * Endpoint: GET /apis/:apiId/versions
 */
const getApiVersions = {
  user: Joi.object().keys({
    customerNumber: requestUserValidation.customerNumber,
  }),
  params: Joi.object().keys({
    apiId: Joi.number().integer().required(),
  }),
  query: Joi.object().keys({
    ...requestQueryValidation.options,

    // Filter
    apiVersionId: Joi.number().integer().min(1),
    milemarkerSystemUuid: Joi.string(),
    apiId: Joi.number().integer().min(1),
    boxId: Joi.number().integer().min(1),
    customerNumber: Joi.string(),
    enabled: Joi.boolean(),
    public: Joi.boolean(),
    version: Joi.number().integer().min(1),
    createdBy: Joi.string(),
    createdAt: Joi.date(),
    updatedBy: Joi.string(),
  }),
};

/**
 * Validation Schema: Get api version by id
 * Endpoint: GET /apis/:apiId/versions/:versionId
 */
const getApiVersion = {
  user: Joi.object().keys({
    customerNumber: requestUserValidation.customerNumber,
  }),
  params: Joi.object().keys({
    apiId: Joi.number().integer().required(),
    versionId: Joi.number().integer().required(),
  }),
};

/**
 * Validation Schema: Update api version by id
 * Endpoint: PUT /apis/:apiId/versions/:versionId
 */
const updateApiVersion = {
  user: Joi.object().keys({
    username: requestUserValidation.username,
  }),
  params: Joi.object().keys({
    apiId: Joi.number().integer().required(),
    versionId: Joi.number().integer().required(),
  }),
  body: Joi.object().keys({
    version: Joi.number().integer().min(1).required(),
    enabled: Joi.boolean().required(),
    public: Joi.boolean().required(),
  }),
};

/**
 * Validation Schema: Delete api version by id
 * Endpoint: DELETE /apis/:apiId/versions/:versionId
 */
const deleteApiVersion = {
  user: Joi.object().keys({
    username: requestUserValidation.username,
  }),
  params: Joi.object().keys({
    apiId: Joi.number().integer().required(),
    versionId: Joi.number().integer().required(),
  }),
};

module.exports = {
  createApiVersion,
  getApiVersions,
  getApiVersion,
  updateApiVersion,
  deleteApiVersion,
};
