const generateGetAllObjectsQuery = (customerNumber) =>
  `SELECT * FROM ECHO_DEV.MILEMARKER.FOXTROT_DBOBJECT_GET WHERE "customerNumber" = ${customerNumber} `;

const generateGetObjectByIdQuery = (customerNumber, objectId) =>
  `SELECT * FROM ECHO_DEV.MILEMARKER.FOXTROT_DBOBJECT_GET WHERE "customerNumber" = ${customerNumber} AND "dbObjectId" = ${objectId} `;

const generateGetAllConnectionObjectsQuery = (customerNumber, connectionId) =>
  `SELECT * FROM ECHO_DEV.MILEMARKER.FOXTROT_DBOBJECT_GET WHERE  "customerNumber" = ${customerNumber} AND "connectionId" = '${connectionId}' `;

const generateGetConnectionObjectByIdQuery = (customerNumber, connectionId, objectId) =>
  `SELECT * FROM ECHO_DEV.MILEMARKER.FOXTROT_DBOBJECT_GET WHERE  "customerNumber" = ${customerNumber} AND "connectionId" = '${connectionId}' AND "dbObjectId" = ${objectId} `;

module.exports = {
  generateGetAllObjectsQuery,
  generateGetObjectByIdQuery,
  generateGetAllConnectionObjectsQuery,
  generateGetConnectionObjectByIdQuery,
};
