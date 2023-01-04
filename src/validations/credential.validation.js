const Joi = require('joi');
const { requestQueryValidation, requestUserValidation } = require('.');

/**
 * Validation Schema: Create credential
 * Endpoint: POST /credentials/:credentialType
 */
const createCredential = {
  user: Joi.object().keys({
    customerNumber: requestUserValidation.customerNumber,
    username: requestUserValidation.username,
  }),
  params: Joi.object().keys({
    credentialType: Joi.string().lowercase().valid('ftp', 'google', 'dropbox', 'aws', 'api'),
  }),
  body: Joi.alternatives().conditional(Joi.ref('params.credentialType'), {
    switch: [
      {
        is: 'ftp',
        then: Joi.object().keys({
          name: Joi.string().required(),
          description: Joi.string().default(''),
          username: Joi.string().required(),
          password: Joi.string().required(),
          encryption: Joi.string()
            .lowercase()
            .valid(
              'ftp over tls if available',
              'plain ftp (insecure)',
              'required ftp over tls',
              'explicit - implicit settings for tls'
            )
            .default('ftp over tls if available'),
        }),
      },
      {
        is: 'google',
        then: Joi.object().keys({
          name: Joi.string().required(),
          description: Joi.string().default(''),
          accessToken: Joi.string().required(),
          refreshToken: Joi.string().required(),
          expiryDate: Joi.number().integer().required(),
        }),
      },
      {
        is: 'dropbox',
        then: Joi.object().keys({
          name: Joi.string().required(),
          description: Joi.string().default(''),
          token: Joi.string().required(),
        }),
      },
      {
        is: 'aws',
        then: Joi.object().keys({
          name: Joi.string().required(),
          description: Joi.string().default(''),
          key: Joi.string().required(),
          secret: Joi.string().required(),
        }),
      },
      {
        is: 'api',
        then: Joi.object().keys({
          name: Joi.string().required(),
          description: Joi.string().default(''),
          authentication: Joi.object().required(),
        }),
      },
    ],
  }),
};

/**
 * Validation Schema: Get all credentials
 * Endpoint: GET /credentials
 */
const getCredentials = {
  user: Joi.object().keys({
    customerNumber: requestUserValidation.customerNumber,
  }),
  query: Joi.object().keys({
    // Options
    ...requestQueryValidation.options,

    // Filter
    milemarkerSystemId: Joi.number().integer().min(1),
    milemarkerSystemInserted: Joi.date(),
    milemarkerSystemInsertedBy: Joi.string(),
    milemarkerSystemUpdated: Joi.date(),
    milemarkerSystemUpdatedBy: Joi.string(),
    milemarkerSystemUuid: Joi.string(),
    customerNumber: Joi.string(),
    name: Joi.string(),
    description: Joi.string(),
    type: Joi.string().lowercase().valid('ftp', 'google', 'dropbox', 'aws', 'api'),
    username: Joi.string(),
    password: Joi.string(),
    accessToken: Joi.string(),
    refreshToken: Joi.string(),
    expiryDate: Joi.date,
    token: Joi.string(),
    key: Joi.string(),
    secret: Joi.string(),
    authentication: Joi.object(),
  }),
};

/**
 * Validation Schema: Get credential by id
 * Endpoint: GET /credentials/:credentialId
 */
const getCredential = {
  user: Joi.object().keys({
    customerNumber: requestUserValidation.customerNumber,
  }),
  params: Joi.object().keys({
    credentialId: Joi.number().integer().required(),
  }),
};

/**
 * Validation Schema: Update credential by id
 * Endpoint: PUT /credentials/:credentialId
 */
const updateCredential = {
  user: Joi.object().keys({
    username: requestUserValidation.username,
    customerNumber: requestUserValidation.customerNumber,
  }),
  params: Joi.object().keys({
    credentialId: Joi.number().integer().required(),
    credentialType: Joi.string().lowercase().valid('ftp', 'google', 'dropbox', 'aws', 'api').required(),
  }),
  body: Joi.alternatives().conditional(Joi.ref('params.credentialType'), {
    switch: [
      {
        is: 'ftp',
        then: Joi.object().keys({
          name: Joi.string().required(),
          description: Joi.string().default(''),
          username: Joi.string().required(),
          password: Joi.string().required(),
          encryption: Joi.string()
            .lowercase()
            .valid(
              'ftp over tls if available',
              'plain ftp (insecure)',
              'required ftp over tls',
              'explicit - implicit settings for tls'
            )
            .default('ftp over tls if available'),
        }),
      },
      {
        is: 'google',
        then: Joi.object().keys({
          name: Joi.string().required(),
          description: Joi.string().default(''),
          accessToken: Joi.string().required(),
          refreshToken: Joi.string().required(),
          expiryDate: Joi.number().integer().required(),
        }),
      },
      {
        is: 'dropbox',
        then: Joi.object().keys({
          name: Joi.string().required(),
          description: Joi.string().default(''),
          token: Joi.string().required(),
        }),
      },
      {
        is: 'aws',
        then: Joi.object().keys({
          name: Joi.string().required(),
          description: Joi.string().default(''),
          key: Joi.string().required(),
          secret: Joi.string().required(),
        }),
      },
      {
        is: 'api',
        then: Joi.object().keys({
          name: Joi.string().required(),
          description: Joi.string().default(''),
          authentication: Joi.object().required(),
        }),
      },
    ],
  }),
};

/**
 * Validation Schema: Delete credential by id
 * Endpoint: DELETE /credentials/:credentialId
 */
const deleteCredential = {
  user: Joi.object().keys({
    username: requestUserValidation.username,
  }),
  params: Joi.object().keys({
    credentialId: Joi.number().integer().required(),
  }),
};

module.exports = {
  getCredentials,
  getCredential,
  createCredential,
  updateCredential,
  deleteCredential,
};
