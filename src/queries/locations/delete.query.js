const generateDeleteLocationByIdQuery = (locationId, username) =>
  `CALL MILEMARKER.FOXTROT_LOCATION_DELETE(${locationId}, '${username}')`;

module.exports = {
  generateDeleteLocationByIdQuery,
};
