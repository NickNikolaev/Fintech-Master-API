const Joi = require('joi');
const { requestQueryValidation, requestUserValidation } = require('.');

/**
 * Validation Schema: Create location
 * Endpoint: POST /locations/:locationType
 */
const createLocation = {
  user: Joi.object().keys({
    customerNumber: requestUserValidation.customerNumber,
    username: requestUserValidation.username,
  }),
  params: Joi.object().keys({
    locationType: Joi.string().lowercase().valid('ftp', 'google', 'dropbox', 'api', 'db-connection').required(),
  }),
  body: Joi.alternatives().conditional(Joi.ref('params.locationType'), {
    switch: [
      {
        is: 'ftp',
        then: Joi.object().keys({
          name: Joi.string().required(),
          description: Joi.string().default(''),
          host: Joi.string().required(),
          port: Joi.number().integer().min(1).required(),
          protocol: Joi.string().uppercase().valid('FTP', 'SFTP').required(),
          credentials: Joi.number().integer().min(1).required(),
          folder: Joi.string().default('').required(),
        }),
      },
      {
        is: ['google', 'dropbox'],
        then: Joi.object().keys({
          name: Joi.string().required(),
          description: Joi.string().default(''),
          credentials: Joi.number().integer().min(1).required(),
        }),
      },
      {
        is: 'api',
        then: Joi.object().keys({
          name: Joi.string().required(),
          description: Joi.string().default(''),
          credentials: Joi.number().integer().min(1).default(0),
          endpoint: Joi.string().required(),
          method: Joi.string().uppercase().valid('GET', 'POST', 'PUT', 'PATCH', 'DELETE').required(),
          dataObject: Joi.string().default(''),
          timeout: Joi.number().integer().default(15000),
          config: Joi.object()
            .keys({
              type: Joi.string().lowercase().valid('json', 'xml').default('json'),
            })
            .unknown()
            .default({
              type: 'json',
            }),
        }),
      },
      {
        is: 'db-connection',
        then: Joi.object().keys({
          name: Joi.string().required(),
          description: Joi.string().default(''),
          object: Joi.alternatives()
            .try(
              Joi.object().keys({
                id: Joi.number().min(1).required(),
              }),
              Joi.object().keys({
                dbObject: Joi.string().required(),
                connectionDetails: Joi.alternatives()
                  .try(
                    Joi.object().keys({
                      databaseName: Joi.string().required(),
                      databaseType: Joi.string().required(),
                      databaseHost: Joi.string().required(),
                      databasePassword: Joi.string().required(),
                      databasePort: Joi.number().integer().min(1).required(),
                      databaseUsername: Joi.string().required(),
                      encrypt: Joi.boolean().required(),
                    }),
                    Joi.object().keys({
                      databaseType: Joi.string().required(),
                      account: Joi.string().required(),
                      username: Joi.string().required(),
                      password: Joi.string().required(),
                      warehouse: Joi.string().required(),
                      database: Joi.string().required(),
                    })
                  )
                  .match('one'),
              }),
              Joi.object().keys({
                query: Joi.string().required(),
                connectionDetails: Joi.alternatives()
                  .try(
                    Joi.object().keys({
                      databaseName: Joi.string().required(),
                      databaseType: Joi.string().required(),
                      databaseHost: Joi.string().required(),
                      databasePassword: Joi.string().required(),
                      databasePort: Joi.number().integer().min(1).required(),
                      databaseUsername: Joi.string().required(),
                      encrypt: Joi.boolean().required(),
                    }),
                    Joi.object().keys({
                      databaseType: Joi.string().required(),
                      account: Joi.string().required(),
                      username: Joi.string().required(),
                      password: Joi.string().required(),
                      warehouse: Joi.string().required(),
                      database: Joi.string().required(),
                    })
                  )
                  .match('one'),
              })
            )
            .match('one'),
        }),
      },
    ],
  }),
};

/**
 * Validation Schema: Create AWS location
 * Endpoint: POST /locations/aws/:locationType
 */
const createAWSLocation = {
  user: Joi.object().keys({
    customerNumber: requestUserValidation.customerNumber,
    username: requestUserValidation.username,
  }),
  params: Joi.object().keys({
    locationType: Joi.string().valid('s3', 'dynamo', 'glacier', 'redshift').required(),
  }),
  body: Joi.alternatives().conditional(Joi.ref('params.locationType'), {
    switch: [
      {
        is: 's3',
        then: Joi.object().keys({
          name: Joi.string().required(),
          description: Joi.string().default(''),
          credentials: Joi.number().integer().min(1).required(),
          bucket: Joi.string().required(),
          region: Joi.string().default(''),
          bucketFolder: Joi.string().default(''),
        }),
      },
      {
        is: 'dynamo',
        then: Joi.object().keys({
          name: Joi.string().required(),
          description: Joi.string().default(''),
          credentials: Joi.number().integer().min(1).required(),
          table: Joi.string().required(),
          region: Joi.string().default(''),
        }),
      },
      {
        is: 'glacier',
        then: Joi.object().keys({
          name: Joi.string().required(),
          description: Joi.string().default(''),
          credentials: Joi.number().integer().min(1).required(),
          vault: Joi.string().required(),
          region: Joi.string().default(''),
        }),
      },
      {
        is: 'redshift',
        then: Joi.object().keys({
          name: Joi.string().required(),
          description: Joi.string().default(''),
          credentials: Joi.number().integer().min(1).required(),
          username: Joi.string().required(),
          password: Joi.string().required(),
          database: Joi.string().required(),
          port: Joi.number().integer().min(1).required(),
          host: Joi.string().required(),
        }),
      },
    ],
  }),
};

/**
 * Validation Schema: Get all locations
 * Endpoint: GET /locations/
 */
const getLocations = {
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
    type: Joi.string().lowercase().valid('s3', 'dynamo', 'glacier', 'redshift'),
    host: Joi.string(),
    port: Joi.number().integer().min(1),
    protocol: Joi.string(),
    credentials: Joi.string(),
    bucket: Joi.string(),
    region: Joi.string(),
    endpoint: Joi.string(),
    method: Joi.string().uppercase().valid('GET', 'POST', 'PUT', 'PATCH', 'DELETE'),
    dataObject: Joi.object(),
    vault: Joi.string(),
    table: Joi.string(),
    username: Joi.string(),
    password: Joi.string(),
    database: Joi.string(),
    object: Joi.object(),
    timeout: Joi.number().integer(),
  }),
};

/**
 * Validation Schema: Get location by id
 * Endpoint: GET /locations/:locationId
 */
const getLocation = {
  user: Joi.object().keys({
    customerNumber: requestUserValidation.customerNumber,
  }),
  params: Joi.object().keys({
    locationId: Joi.number().integer().required(),
  }),
};

/**
 * Validation Schema: Update location by id
 * Endpoint: PUT /locations/:locationId
 */
const updateLocation = {
  user: Joi.object().keys({
    customerNumber: requestUserValidation.customerNumber,
    username: requestUserValidation.username,
  }),
  params: Joi.object().keys({
    locationId: Joi.number().integer().required(),
    locationType: Joi.string()
      .valid('ftp', 'google', 'dropbox', 'api', 'dbConnection', 's3', 'glacier', 'dynamo', 'redshift')
      .required(),
  }),
  body: Joi.alternatives().conditional(Joi.ref('params.locationType'), {
    switch: [
      {
        is: 'ftp',
        then: Joi.object().keys({
          name: Joi.string().required(),
          description: Joi.string().default(''),
          host: Joi.string().required(),
          port: Joi.number().integer().min(1).required(),
          protocol: Joi.string().uppercase().valid('FTP', 'SFTP').required(),
          credentials: Joi.number().integer().min(1).required(),
          folder: Joi.string().required(),
        }),
      },
      {
        is: ['google', 'dropbox'],
        then: Joi.object().keys({
          name: Joi.string().required(),
          description: Joi.string().default(''),
          credentials: Joi.number().integer().min(1).required(),
        }),
      },
      {
        is: 'api',
        then: Joi.object().keys({
          name: Joi.string().required(),
          description: Joi.string().default(''),
          credentials: Joi.number().integer().min(1).default(0),
          endpoint: Joi.string().required(),
          method: Joi.string().uppercase().valid('GET', 'POST', 'PUT', 'PATCH', 'DELETE').required(),
          dataObject: Joi.string().default(''),
          timeout: Joi.number().integer().default(15000),
          config: Joi.object()
            .keys({
              type: Joi.string().lowercase().valid('json', 'xml').default('json'),
            })
            .unknown()
            .default({
              type: 'json',
            }),
        }),
      },
      {
        is: 'dbConnection',
        then: Joi.object().keys({
          name: Joi.string().required(),
          description: Joi.string().default(''),
          object: Joi.alternatives()
            .try(
              Joi.object().keys({
                id: Joi.number().min(1).required(),
              }),
              Joi.object().keys({
                dbObject: Joi.string().required(),
                connectionDetails: Joi.alternatives()
                  .try(
                    Joi.object().keys({
                      databaseName: Joi.string().required(),
                      databaseType: Joi.string().required(),
                      databaseHost: Joi.string().required(),
                      databasePassword: Joi.string().required(),
                      databasePort: Joi.number().integer().min(1).required(),
                      databaseUsername: Joi.string().required(),
                      encrypt: Joi.boolean().required(),
                    }),
                    Joi.object().keys({
                      databaseType: Joi.string().required(),
                      account: Joi.string().required(),
                      username: Joi.string().required(),
                      password: Joi.string().required(),
                      warehouse: Joi.string().required(),
                      database: Joi.string().required(),
                    })
                  )
                  .match('one'),
              }),
              Joi.object().keys({
                query: Joi.string().required(),
                connectionDetails: Joi.alternatives()
                  .try(
                    Joi.object().keys({
                      databaseName: Joi.string().required(),
                      databaseType: Joi.string().required(),
                      databaseHost: Joi.string().required(),
                      databasePassword: Joi.string().required(),
                      databasePort: Joi.number().integer().min(1).required(),
                      databaseUsername: Joi.string().required(),
                      encrypt: Joi.boolean().required(),
                    }),
                    Joi.object().keys({
                      databaseType: Joi.string().required(),
                      account: Joi.string().required(),
                      username: Joi.string().required(),
                      password: Joi.string().required(),
                      warehouse: Joi.string().required(),
                      database: Joi.string().required(),
                    })
                  )
                  .match('one'),
              })
            )
            .match('one'),
        }),
      },
      {
        is: 's3',
        then: Joi.object().keys({
          name: Joi.string().required(),
          description: Joi.string().default(''),
          credentials: Joi.number().integer().min(1).required(),
          bucket: Joi.string().required(),
          region: Joi.string().default(''),
          bucketFolder: Joi.string().default(''),
        }),
      },
      {
        is: 'glacier',
        then: Joi.object().keys({
          name: Joi.string().required(),
          description: Joi.string().default(''),
          credentials: Joi.number().integer().min(1).required(),
          vault: Joi.string().required(),
          region: Joi.string().default(''),
        }),
      },
      {
        is: 'dynamo',
        then: Joi.object().keys({
          name: Joi.string().required(),
          description: Joi.string().default(''),
          credentials: Joi.number().integer().min(1).required(),
          table: Joi.string().required(),
          region: Joi.string().default(''),
        }),
      },
      {
        is: 'redshift',
        then: Joi.object().keys({
          name: Joi.string().required(),
          description: Joi.string().default(''),
          credentials: Joi.number().integer().min(1).required(),
          username: Joi.string().required(),
          password: Joi.string().required(),
          database: Joi.string().required(),
          port: Joi.number().integer().min(1).required(),
          host: Joi.string().required(),
        }),
      },
    ],
  }),
};

/**
 * Validation Schema: Delete location by id
 * Endpoint: DELETE /locations/:locationId
 */
const deleteLocation = {
  user: Joi.object().keys({
    customerNumber: requestUserValidation.customerNumber,
    username: requestUserValidation.username,
  }),
  params: Joi.object().keys({
    locationId: Joi.number().integer().required(),
  }),
};

module.exports = {
  createLocation,
  createAWSLocation,
  getLocations,
  getLocation,
  updateLocation,
  deleteLocation,
};
