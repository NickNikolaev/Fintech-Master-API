const generateGetAllApisQuery = (customerNumber) =>
  `SELECT * FROM MILEMARKER.FOXTROT_API_GET WHERE "customerNumber" = '${customerNumber}' `;

const generateGetApiByIdQuery = (customerNumber, apiId) =>
  `SELECT * FROM MILEMARKER.FOXTROT_API_GET WHERE "customerNumber" = '${customerNumber}' AND "apiId" = ${apiId} `;

module.exports = {
  generateGetAllApisQuery,
  generateGetApiByIdQuery,
};
