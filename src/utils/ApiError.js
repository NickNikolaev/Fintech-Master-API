class ApiError extends Error {
  constructor(statusCode, message, metaData = null, isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    if (metaData) {
      this.metaData = metaData;
      this.isOperational = false;
    }

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;
