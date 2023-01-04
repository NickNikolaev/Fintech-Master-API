const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const { requestQueryValidation, requestUserValidation } = require('.');

/**
 * Validation Schema: Create task
 * Endpoint: POST /tasks/:taskType
 */
const createTask = {
  user: Joi.object().keys({
    username: requestUserValidation.username,
    customerNumber: requestUserValidation.customerNumber,
  }),
  params: Joi.object().keys({
    taskType: Joi.string()
      .valid('move', 'parse', 'api', 'createFile', 'convertFile', 'getFile', 'mojo', 'getData', 'postData', 'updateJob')
      .required(),
  }),
  body: Joi.alternatives().conditional(Joi.ref('params.taskType'), {
    switch: [
      {
        is: 'move',
        then: Joi.object().keys({
          name: Joi.string().required(),
          description: Joi.string().default(''),
          location: Joi.number().integer().min(1).required(),
          file: Joi.object()
            .keys({
              folder: Joi.string().required(),
              filter: Joi.string().default('*'),
              download: Joi.boolean().default(false),
              delete: Joi.boolean().default(false),
            })
            .required(),
          config: Joi.object()
            .keys({
              header: Joi.boolean().default(true),
              quotes: Joi.boolean().default(true),
              quoteChar: Joi.string().valid(`\\\\'`, `\\\\"`).default(`\\\\"`),
              fileId: Joi.string().default(''),
              databaseId: Joi.string().default(''),
              primaryKey: Joi.string().default('id'),
              fileDate: Joi.string().default(''),
              logDate: Joi.string().default(''),
              parameters: Joi.object().default({}),
            })
            .default({
              header: true,
              quotes: true,
              quoteChar: '\\\\"',
              fileId: '',
              databaseId: '',
              primaryKey: 'id',
              fileDate: '',
              logDate: '',
              parameters: {},
            }),
        }),
      },
      {
        is: 'parse',
        then: Joi.object().keys({
          name: Joi.string().required(),
          description: Joi.string().default(''),
          location: Joi.alternatives()
            .try(
              Joi.object().keys({
                source: Joi.number().integer().min(1).required(),
              }),
              Joi.object().keys({
                cache: Joi.number().integer().min(1).required(),
              }),
              Joi.object().keys({
                source: Joi.number().integer().min(1).required(),
                cache: Joi.number().integer().min(1).required(),
              })
            )
            .match('one'),
          file: Joi.object()
            .keys({
              format: Joi.array().items(Joi.string().valid('.csv', '.txt', '.json', '.xls', '.xlsx')).min(1).required(),
              folder: Joi.string().required(),
              filter: Joi.string().default('*'),
            })
            .required(),
          config: Joi.object()
            .keys({
              header: Joi.boolean().default(true),
              delimiter: Joi.string().valid('', ',', ';', '\t', '|').default(''),
              encoding: Joi.string().default('UTF-8'),
              map: Joi.object()
                .keys({
                  data: Joi.array().items(Joi.object()).default([]),
                  interpolation: Joi.array().items(Joi.object()).default([]),
                })
                .default({
                  data: [],
                  interpolation: [],
                }),
            })
            .default({
              header: true,
              delimiter: '',
              encoding: 'UTF-8',
              map: {
                data: [],
                interpolation: [],
              },
            }),
        }),
      },
      {
        is: 'api',
        then: Joi.object().keys({
          name: Joi.string().required(),
          description: Joi.string().default(''),
          getData: Joi.object().required(),
          postData: Joi.object().required(),
        }),
      },
      {
        is: 'createFile',
        then: Joi.object().keys({
          name: Joi.string().required(),
          description: Joi.string().default(''),
          location: Joi.alternatives()
            .try(
              Joi.object().keys({
                source: Joi.number().integer().min(1).required(),
              }),
              Joi.object().keys({
                cache: Joi.number().integer().min(1).required(),
              }),
              Joi.object().keys({
                source: Joi.number().integer().min(1).required(),
                cache: Joi.number().integer().min(1).required(),
              })
            )
            .match('one'),
          file: Joi.object()
            .keys({
              format: Joi.array().items(Joi.string().valid('.csv', '.txt', '.json', '.xls', '.xlsx')).min(1).required(),
              name: Joi.string().required(),
              timestamp: Joi.boolean().default(true),
              folder: Joi.string().default(''),
            })
            .required(),
          config: Joi.object()
            .keys({
              header: Joi.boolean().default(true),
              quotes: Joi.boolean().default(true),
              delimiter: Joi.string().valid(',', ';', '\t', '|').default(','),
              map: Joi.array().items(
                Joi.object().keys({
                  type: Joi.string().lowercase().valid('location', 'credentials').default('location'),
                  property: Joi.string().required(),
                  interpolation: Joi.object().required(),
                })
              ),
              sheet: Joi.number().integer().min(1).default(0),
              newLine: Joi.string().valid('', '\\n', '\\r\\n').default(''),
              quoteChar: Joi.string().valid(`'`, `"`).default('\\\\"'),
              pagination: Joi.object().keys({
                type: Joi.string().valid('', 'hubspot', 'salesforce').default(''),
              }),
              fileId: Joi.string().default(''),
              databaseId: Joi.string().default(''),
              primaryKey: Joi.string().default('id'),
              fileDate: Joi.string().default(''),
              logDate: Joi.string().default(''),
              parameters: Joi.object().default({}),
              emptyEOL: Joi.boolean().default(false),
            })
            .default({
              header: true,
              quotes: true,
              delimiter: ',',
              map: [],
              sheet: 0,
              newLine: '',
              quoteChar: `\\\\"`,
              fileId: '',
              databaseId: '',
              primaryKey: 'id',
              fileDate: '',
              logDate: '',
              parameters: {},
              emptyEOL: false,
            }),
        }),
      },
      {
        is: 'convertFile',
        then: Joi.object().keys({
          name: Joi.string().required(),
          description: Joi.string().default(''),
          fileType: Joi.string().required(),
        }),
      },
      {
        is: ['getFile', 'mojo'],
        then: Joi.object().keys({
          name: Joi.string().required(),
          description: Joi.string().default(''),
          key: Joi.string().required(),
          secret: Joi.string().required(),
        }),
      },
      {
        is: 'getData',
        then: Joi.object().keys({
          name: Joi.string().required(),
          description: Joi.string().default(''),
          location: Joi.object()
            .keys({
              source: Joi.number().integer().min(1).required(),
              cache: Joi.number().integer().min(1),
            })
            .required(),
          config: Joi.object()
            .when(Joi.ref('location'), {
              is: Joi.object().length(2),
              then: Joi.object().keys({
                deleteCache: Joi.boolean().default(true),
                map: Joi.array()
                  .items(
                    Joi.object().keys({
                      type: Joi.string().lowercase().valid('location', 'credentials').default('location'),
                      property: Joi.string().required(),
                      interpolation: Joi.object().required(),
                    })
                  )
                  .required(),
              }),
              otherwise: Joi.object().keys({
                deleteCache: Joi.boolean().default(true),
              }),
            })
            .default({
              deleteCache: true,
            }),
        }),
      },
      {
        is: 'postData',
        then: Joi.object().keys({
          name: Joi.string().required(),
          description: Joi.string().default(''),
          location: Joi.object()
            .keys({
              source: Joi.number().integer().min(1).required(),
              cache: Joi.number().integer().min(1).required(),
            })
            .required(),
          config: Joi.object()
            .keys({
              map: Joi.array()
                .items(
                  Joi.object().keys({
                    type: Joi.string().lowercase().valid('location', 'credentials').default('location'),
                    property: Joi.string().required(),
                    interpolation: Joi.object().required(),
                  })
                )
                .required(),
            })
            .required(),
        }),
      },
      {
        is: 'updateJob',
        then: Joi.object().keys({
          name: Joi.string().required(),
          description: Joi.string().default(''),
          location: Joi.objectId().required(),
          config: Joi.object()
            .keys({
              disabled: Joi.boolean().required(),
              lockedAt: Joi.date().iso().required(),
              nextRunAt: Joi.date().iso().required(),
            })
            .required(),
        }),
      },
    ],
  }),
};

/**
 * Validation Schema: Get all tasks
 * Endpoint: GET /tasks
 */
const getTasks = {
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
    type: Joi.string().valid(
      'move',
      'parse',
      'api',
      'createFile',
      'convertFile',
      'getFile',
      'mojo',
      'getData',
      'postData',
      'cx1'
    ),
    createdBy: Joi.string(),
    name: Joi.string(),
    description: Joi.string(),
    location: Joi.string(),
    fileType: Joi.string(),
    filter: Joi.string(),
    rename: Joi.string(),
    url: Joi.string(),
    folder: Joi.string(),
    config: Joi.object(),
    getData: Joi.object(),
    postData: Joi.object(),
    file: Joi.object(),
    quoteChar: Joi.symbol(),
    delimiter: Joi.symbol(),
    header: Joi.object(),
    newLine: Joi.symbol(),
    sheet: Joi.number().integer().valid(1),
    map: Joi.object(),
    urlMap: Joi.object(),
  }),
};

/**
 * Validation Schema: Get task by id
 * Endpoint: GET /tasks/:taskId
 */
const getTask = {
  user: Joi.object().keys({
    customerNumber: requestUserValidation.customerNumber,
  }),
  params: Joi.object().keys({
    taskId: Joi.number().integer().required(),
  }),
};

/**
 * Validation Schema: Update task by id
 * Endpoint: PUT /tasks/:id
 */
const updateTask = {
  user: Joi.object().keys({
    customerNumber: requestUserValidation.customerNumber,
    username: requestUserValidation.username,
  }),
  params: Joi.object().keys({
    taskId: Joi.number().integer().required(),
    taskType: Joi.string()
      .valid('move', 'parse', 'api', 'createFile', 'convertFile', 'getFile', 'mojo', 'getData', 'postData', 'updateJob')
      .required(),
  }),
  body: Joi.alternatives().conditional(Joi.ref('params.taskType'), {
    switch: [
      {
        is: 'move',
        then: Joi.object().keys({
          name: Joi.string().required(),
          description: Joi.string().default(''),
          location: Joi.number().integer().min(1).required(),
          file: Joi.object()
            .keys({
              folder: Joi.string().required(),
              filter: Joi.string().default('*'),
              download: Joi.boolean().default(false),
              delete: Joi.boolean().default(false),
            })
            .required(),
          config: Joi.object()
            .keys({
              header: Joi.boolean().default(true),
              quotes: Joi.boolean().default(true),
              quoteChar: Joi.string().valid(`\\\\'`, `\\\\"`).default(`\\\\"`),
              fileId: Joi.string().default(''),
              databaseId: Joi.string().default(''),
              primaryKey: Joi.string().default('id'),
              fileDate: Joi.string().default(''),
              logDate: Joi.string().default(''),
              parameters: Joi.object().default({}),
            })
            .default({
              header: true,
              quotes: true,
              quoteChar: '\\\\"',
              fileId: '',
              databaseId: '',
              primaryKey: 'id',
              fileDate: '',
              logDate: '',
              parameters: {},
            }),
        }),
      },
      {
        is: 'parse',
        then: Joi.object().keys({
          name: Joi.string().required(),
          description: Joi.string().default(''),
          location: Joi.alternatives()
            .try(
              Joi.object().keys({
                source: Joi.number().integer().min(1).required(),
              }),
              Joi.object().keys({
                cache: Joi.number().integer().min(1).required(),
              }),
              Joi.object().keys({
                source: Joi.number().integer().min(1).required(),
                cache: Joi.number().integer().min(1).required(),
              })
            )
            .match('one'),
          file: Joi.object()
            .keys({
              format: Joi.array().items(Joi.string().valid('.csv', '.txt', '.json', '.xls', '.xlsx')).min(1).required(),
              folder: Joi.string().required(),
              filter: Joi.string().default('*'),
            })
            .required(),
          config: Joi.object()
            .keys({
              header: Joi.boolean().default(true),
              delimiter: Joi.string().valid('', ',', ';', '\t', '|').default(''),
              encoding: Joi.string().default('UTF-8'),
              map: Joi.object()
                .keys({
                  data: Joi.array().items(Joi.object()).default([]),
                  interpolation: Joi.array().items(Joi.object()).default([]),
                })
                .default({
                  data: [],
                  interpolation: [],
                }),
            })
            .default({
              header: true,
              delimiter: '',
              encoding: 'UTF-8',
              map: {
                data: [],
                interpolation: [],
              },
            }),
        }),
      },
      {
        is: 'api',
        then: Joi.object().keys({
          name: Joi.string().required(),
          description: Joi.string().default(''),
          getData: Joi.object().required(),
          postData: Joi.object().required(),
        }),
      },
      {
        is: 'createFile',
        then: Joi.object().keys({
          name: Joi.string().required(),
          description: Joi.string().default(''),
          location: Joi.alternatives()
            .try(
              Joi.object().keys({
                source: Joi.number().integer().min(1).required(),
              }),
              Joi.object().keys({
                cache: Joi.number().integer().min(1).required(),
              }),
              Joi.object().keys({
                source: Joi.number().integer().min(1).required(),
                cache: Joi.number().integer().min(1).required(),
              })
            )
            .match('one'),
          file: Joi.object()
            .keys({
              format: Joi.array().items(Joi.string().valid('.csv', '.txt', '.json', '.xls', '.xlsx')).min(1).required(),
              name: Joi.string().required(),
              timestamp: Joi.boolean().default(true),
              folder: Joi.string().default(''),
            })
            .required(),
          config: Joi.object()
            .keys({
              header: Joi.boolean().default(true),
              quotes: Joi.boolean().default(true),
              delimiter: Joi.string().valid(',', ';', '\t', '|').default(','),
              map: Joi.array().items(
                Joi.object().keys({
                  type: Joi.string().lowercase().valid('location', 'credentials').default('location'),
                  property: Joi.string().required(),
                  interpolation: Joi.object().required(),
                })
              ),
              sheet: Joi.number().integer().min(1).default(0),
              newLine: Joi.string().valid('', '\\n', '\\r\\n').default(''),
              quoteChar: Joi.string().valid(`'`, `"`).default('\\\\"'),
              pagination: Joi.object().keys({
                type: Joi.string().valid('', 'hubspot', 'salesforce').default(''),
              }),
              fileId: Joi.string().default(''),
              databaseId: Joi.string().default(''),
              primaryKey: Joi.string().default('id'),
              fileDate: Joi.string().default(''),
              logDate: Joi.string().default(''),
              parameters: Joi.object().default({}),
              emptyEOL: Joi.boolean().default(false),
            })
            .default({
              header: true,
              quotes: true,
              delimiter: ',',
              map: [],
              sheet: 0,
              newLine: '',
              quoteChar: `\\\\"`,
              fileId: '',
              databaseId: '',
              primaryKey: 'id',
              fileDate: '',
              logDate: '',
              parameters: {},
              emptyEOL: false,
            }),
        }),
      },
      {
        is: 'convertFile',
        then: Joi.object().keys({
          name: Joi.string().required(),
          description: Joi.string().default(''),
          fileType: Joi.string().required(),
        }),
      },
      {
        is: ['getFile', 'mojo'],
        then: Joi.object().keys({
          name: Joi.string().required(),
          description: Joi.string().default(''),
          key: Joi.string().required(),
          secret: Joi.string().required(),
        }),
      },
      {
        is: 'getData',
        then: Joi.object().keys({
          name: Joi.string().required(),
          description: Joi.string().default(''),
          location: Joi.object()
            .keys({
              source: Joi.number().integer().min(1).required(),
              cache: Joi.number().integer().min(1),
            })
            .required(),
          config: Joi.object()
            .when(Joi.ref('location'), {
              is: Joi.object().length(2),
              then: Joi.object().keys({
                deleteCache: Joi.boolean().default(true),
                map: Joi.array()
                  .items(
                    Joi.object().keys({
                      type: Joi.string().lowercase().valid('location', 'credentials').default('location'),
                      property: Joi.string().required(),
                      interpolation: Joi.object().required(),
                    })
                  )
                  .required(),
              }),
              otherwise: Joi.object().keys({
                deleteCache: Joi.boolean().default(true),
              }),
            })
            .default({
              deleteCache: true,
            }),
        }),
      },
      {
        is: 'postData',
        then: Joi.object().keys({
          name: Joi.string().required(),
          description: Joi.string().default(''),
          location: Joi.object()
            .keys({
              source: Joi.number().integer().min(1).required(),
              cache: Joi.number().integer().min(1).required(),
            })
            .required(),
          config: Joi.object()
            .keys({
              map: Joi.array()
                .items(
                  Joi.object().keys({
                    type: Joi.string().lowercase().valid('location', 'credentials').default('location'),
                    property: Joi.string().required(),
                    interpolation: Joi.object().required(),
                  })
                )
                .required(),
            })
            .required(),
        }),
      },
      {
        is: 'updateJob',
        then: Joi.object().keys({
          name: Joi.string().required(),
          description: Joi.string().default(''),
          location: Joi.objectId().required(),
          config: Joi.object()
            .keys({
              disabled: Joi.boolean(),
              lockedAt: Joi.date().iso(),
              nextRunAt: Joi.date().iso(),
            })
            .min(1)
            .required(),
        }),
      },
    ],
  }),
};

/**
 * Validation Schema: Delete task by id
 * Endpoint: DELETE /tasks/:taskId
 */
const deleteTask = {
  user: Joi.object().keys({
    customerNumber: requestUserValidation.customerNumber,
    username: requestUserValidation.username,
  }),
  params: Joi.object().keys({
    taskId: Joi.number().integer().required(),
  }),
};

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
};
