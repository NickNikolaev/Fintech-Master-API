const generateGetAllApiEndpointsQuery = (customerNumber, apiId) =>
  `SELECT * FROM ECHO_DEV.MILEMARKER.FOXTROT_APIENDPOINT_GET WHERE "customerNumber" = '${customerNumber}' AND "apiId" = ${apiId} `;

const generateGetApiEndpointByIdQuery = (customerNumber, apiId, endpointId) =>
  `SELECT * FROM ECHO_DEV.MILEMARKER.FOXTROT_APIENDPOINT_GET WHERE "customerNumber" = '${customerNumber}' AND "apiId" = ${apiId} AND "apiEndpointId" = ${endpointId} `;

module.exports = {
  generateGetAllApiEndpointsQuery,
  generateGetApiEndpointByIdQuery,
};
