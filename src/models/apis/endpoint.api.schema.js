const apiEndpointSchema = {
  item: {
    id: 'apiEndpointId',
    apiVersionId: 'versionId',
    apiId: 'apiId',
    boxId: 'boxId',
    customerNumber: 'customerNumber',
    method: 'method',
    dbObjectId: 'dbObjectId',
    dbObjectUrl: 'dbObjectUrl',
    enabled: 'enabled',
    createdBy: 'createdBy',
    updatedBy: 'updatedBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
  remove: ['milemarkerSystemUuid'],
};

module.exports = apiEndpointSchema;
