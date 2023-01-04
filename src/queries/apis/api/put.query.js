const generateUpdateApiByIdQuery = (apiId, customerNumber, boxId, name, url, username) =>
  `CALL ECHO_DEV.MILEMARKER.FOXTROT_API_PUT(${apiId}, '${customerNumber}', ${boxId}, '${name}', '${url}', '[{}]', '${username}')`;

module.exports = {
  generateUpdateApiByIdQuery,
};
