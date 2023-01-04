const httpStatus = require('http-status');
const errorMessages = require('../utils/errorMessages');
const ApiError = require('../utils/ApiError');
const { executeQuery } = require('../config/snowflake');
const { generateGetBoxByIdQuery } = require('../queries/boxes/get.query');

/**
 * Get box by id
 * @param user
 * @param body
 * @returns {Promise<*>}
 */
const getBoxById = async (user, body) => {
  // Get box by id (to make sure it exists)
  user.customerNumber = 999999;
  const getBoxByIdQuery = generateGetBoxByIdQuery(user.customerNumber, body.boxId);
  const box = await executeQuery(getBoxByIdQuery);

  // If box is not found -> Throw error
  if (box.length === 0) {
    const errorMessage = errorMessages.NOT_FOUND('box', body.boxId);
    throw new ApiError(httpStatus.NOT_FOUND, errorMessage);
  }

  // Return box
  return box[0];
};

module.exports = {
  getBoxById,
};
