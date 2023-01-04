const Joi = require('joi');
const { requestQueryValidation, requestUserValidation } = require('..');

/**
 * Validation Schema: Create api
 * Endpoint: POST /apis
 */
const createApi = {
  user: Joi.object().keys({
    customerNumber: requestUserValidation.customerNumber,
    username: requestUserValidation.username,
  }),
  body: Joi.object().keys({
    boxId: Joi.number().integer().min(1).required(),
    name: Joi.string().required(),
    url: Joi.string().required(),
    public: Joi.boolean().required(),
    enabled: Joi.boolean().required(),
  }),
};

/**
 * Validation Schema: Get all apis
 * Endpoint: GET /apis
 */
const getApis = {
  user: Joi.object().keys({
    customerNumber: requestUserValidation.customerNumber,
  }),
  query: Joi.object().keys({
    // Options
    ...requestQueryValidation.options,

    // Filter
    apiId: Joi.number().integer().min(1),
    milemarkerSystemUuid: Joi.string(),
    boxId: Joi.number().integer().min(1),
    name: Joi.string(),
    description: Joi.string(),
    url: Joi.string(),
    customerNumber: Joi.string(),
    createdBy: Joi.string(),
    createdAt: Joi.date(),
    updatedBy: Joi.string(),
  }),
};

/**
 * Validation Schema: Get api by id
 * Endpoint: GET /apis/:apiId
 */
const getApi = {
  user: Joi.object().keys({
    customerNumber: requestUserValidation.customerNumber,
  }),
  params: Joi.object().keys({
    apiId: Joi.number().integer().required(),
  }),
};

/**
 * Validation Schema: Update api by id
 * Endpoint: PUT /apis/:apiId
 */
const updateApi = {
  user: Joi.object().keys({
    customerNumber: requestUserValidation.customerNumber,
    username: requestUserValidation.username,
  }),
  params: Joi.object().keys({
    apiId: Joi.number().integer().required(),
  }),
  body: Joi.object().keys({
    boxId: Joi.number().integer().min(1).required(),
    url: Joi.string().required(),
    name: Joi.string().required(),
  }),
};

/**
 * Validation Schema: Delete api by id
 * Endpoint: DELETE /apis/:apiId
 */
const deleteApi = {
  user: Joi.object().keys({
    username: requestUserValidation.username,
  }),
  params: Joi.object().keys({
    apiId: Joi.number().integer().required(),
  }),
};

module.exports = {
  createApi,
  getApis,
  getApi,
  updateApi,
  deleteApi,
};
