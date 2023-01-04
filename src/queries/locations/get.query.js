const generateGetAllLocationsQuery = (customerNumber) =>
  `SELECT * FROM MILEMARKER.FOXTROT_LOCATION_GET WHERE "customerNumber" = '${customerNumber}' `;

const generateGetLocationByIdQuery = (customerNumber, locationId) =>
  `SELECT * FROM MILEMARKER.FOXTROT_LOCATION_GET WHERE "customerNumber" = '${customerNumber}' AND "milemarkerSystemId" = ${locationId} `;

module.exports = {
  generateGetAllLocationsQuery,
  generateGetLocationByIdQuery,
};
