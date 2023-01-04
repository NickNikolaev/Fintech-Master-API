const mongoose = require('mongoose');
const httpStatus = require('http-status');
const config = require('../config/config');
const logger = require('../config/logger');
const ApiError = require('../utils/ApiError');

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, null, false, err.stack);
  }
  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let { statusCode, message, metaData } = err;

  // If the environment is "production" and the error is not operational -> set the status code and the message
  if (config.env === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  // Create response body
  const response = {
    code: statusCode,
    message,
    ...(config.env === 'development' && { stack: err.stack, metaData }),
  };

  // If the environment is "development" -> log every error
  if (config.env === 'development') logger.error(err);

  // Return response
  res.status(statusCode).send(response);
};

module.exports = {
  errorConverter,
  errorHandler,
};
