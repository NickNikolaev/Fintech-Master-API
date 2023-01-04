const snowflake = require('snowflake-sdk');
const genericPool = require('generic-pool');
require('dotenv').config();

const httpStatus = require('http-status');
const logger = require('./logger');
const ApiError = require('../utils/ApiError');

const factory = {
  create: () =>
    new Promise((resolve, reject) => {
      const connection = snowflake.createConnection({
        account: process.env.MASTER_SNOWFLAKE_HOST,
        password: process.env.MASTER_SNOWFLAKE_PASSWORD,
        username: process.env.MASTER_SNOWFLAKE_USER,
        warehouse: process.env.MASTER_SNOWFLAKE_WAREHOUSE,
        database: process.env.MASTER_SNOWFLAKE_DB,
      });
      connection.connect((err, conn) => {
        if (err) {
          logger.error(`Unable to connect: ${err.message}`);
          reject(new Error(err.message));
        } else {
          logger.info('Successfully connected to Snowflake, ID:', conn.getId());
          resolve(conn);
        }
      });
    }),
  destroy: (connection) =>
    new Promise((resolve, reject) => {
      connection.destroy((err, conn) => {
        if (err) {
          logger.error(`Unable to disconnect: ${err.message}`);
        } else {
          logger.info(`Disconnected connection with id: ${conn.getId()}`);
        }
        resolve();
      });
    }),
  validate: (connection) =>
    new Promise((resolve, reject) => {
      resolve(connection.isUp());
    }),
};

const opts = {
  max: 10,
  min: 3,
  testOnBorrow: true,
  acquireTimeoutMillis: 60000,
  evictionRunIntervalMillis: 900000,
  numTestsPerEvictionRun: 4,
  idleTimeoutMillis: 10800000,
};

const myPool = genericPool.createPool(factory, opts);

const executeQuery = (query, callback, bindParams = []) =>
  new Promise((resolve, reject) => {
    myPool
      .acquire()
      .then((connection) => {
        connection.execute({
          sqlText: query,
          binds: bindParams,
          complete: (err, stmt, rows) => {
            // If error -> Reject
            if (err) {
              logger.error(`Snowflake - Error CODE: ${err.code} \n - Query: ${query} \n - Error: ${err}`);
              reject(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err, { query }));
            }

            // Resolve the rows
            return resolve(rows);
          },
        });
        myPool.release(connection);
      })
      .catch((err) => logger.info(err.message));
  });

module.exports = { executeQuery };
