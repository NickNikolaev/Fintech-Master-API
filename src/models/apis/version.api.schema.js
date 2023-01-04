const apiVersionSchema = {
  item: {
    id: 'apiVersionId',
    apiId: 'apiId',
    boxId: 'boxId',
    customerNumber: 'customerNumber',
    enabled: 'enabled',
    public: 'public',
    version: 'version',
    createdBy: 'createdBy',
    updatedBy: 'updatedBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
  remove: ['milemarkerSystemUuid'],
};

module.exports = apiVersionSchema;
