const generateGetAllApiVersionEndpointsQuery = (customerNumber, apiId, versionId) =>
  `SELECT * FROM ECHO_DEV.MILEMARKER.FOXTROT_APIENDPOINT_GET WHERE "customerNumber" = '${customerNumber}' AND "apiId" = ${apiId} AND "apiVersionId" = ${versionId}  `;

const generateGetApiVersionEndpointByIdQuery = (customerNumber, apiId, versionId, endpointId) =>
  `SELECT * FROM ECHO_DEV.MILEMARKER.FOXTROT_APIENDPOINT_GET WHERE "customerNumber" = '${customerNumber}' AND "apiId" = ${apiId} AND "apiVersionId" = ${versionId} AND "apiEndpointId" = ${endpointId} `;

module.exports = {
  generateGetAllApiVersionEndpointsQuery,
  generateGetApiVersionEndpointByIdQuery,
};
