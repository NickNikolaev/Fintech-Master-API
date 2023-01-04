const generateCreateApiQuery = (customerNumber, boxId, name, url, username) =>
  `CALL ECHO_DEV.MILEMARKER.FOXTROT_API_POST('${customerNumber}', ${boxId}, '${name}', '${url}', '[{}]', '${username}')`;

module.exports = {
  generateCreateApiQuery,
};
