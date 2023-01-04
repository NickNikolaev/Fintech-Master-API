const connectionSchema = {
  item: {
    id: 'dbObjectId',
    boxId: 'boxId',
    customerNumber: 'customerNumber',
    connectionId: 'connectionId',
    objectType: 'objectType',
    objectSchema: 'objectSchema',
    objectName: 'objectName',
    columnsJson: 'columnsJson',
    parametersJson: 'parametersJson',
  },
  remove: ['milemarkerSystemUuid'],
};

module.exports = connectionSchema;
