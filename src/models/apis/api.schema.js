const apiSchema = {
  item: {
    id: 'apiId',
    boxId: 'boxId',
    name: 'name',
    description: 'description',
    url: 'url',
    customerNumber: 'customerNumber',
    createdBy: 'createdBy',
    updatedBy: 'updatedBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
  remove: ['milemarkerSystemUuid'],
};

module.exports = apiSchema;
