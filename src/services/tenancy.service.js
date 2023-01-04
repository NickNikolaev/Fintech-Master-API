const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const { generateGetTenancyByDomainQuery } = require('../queries/tenancy/get.query');
const { executeQuery } = require('../config/snowflake');
const errorMessages = require('../utils/errorMessages');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createApi = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return User.create(userBody);
};

/**
 * Query tenancy
 * @param {Object} body - Mongo filter
 * @returns {Promise<QueryResult>}
 */
const queryTenancy = async (body) => {
  // Generate get tenancy by domain query and Execute it
  const getTenancyByDomainQuery = generateGetTenancyByDomainQuery(body.domain);
  const tenancy = await executeQuery(getTenancyByDomainQuery);

  // If tenancy is not found -> Throw error
  if (!tenancy) {
    const errorMessage = errorMessages.NOT_FOUND('tenant', body.domain);
    throw new ApiError(httpStatus.NOT_FOUND, errorMessage);
  }

  // Return tenancy
  return JSON.parse(tenancy[0].CUSTOMER_VERIFY_POST).ATTR.data;
};

module.exports = {
  queryTenancy,
};
