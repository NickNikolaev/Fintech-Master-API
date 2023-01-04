const genericFields = {
  id: 'milemarkerSystemId',
  createdAt: 'milemarkerSystemInserted',
  createdBy: 'milemarkerSystemInsertedBy',
  updatedAt: 'milemarkerSystemUpdated',
  updatedBy: 'milemarkerSystemUpdatedBy',
  customerNumber: 'customerNumber',
  name: 'name',
  description: 'description',
  type: 'type',
  alert: 'alert',
  alertsCount: 'alertsCount',
  alertMetaData: 'alertMetaData',
};

const move = {
  item: {
    ...genericFields,
    location: {
      source: 'location',
    },
    file: 'file',
  },
  remove: ['milemarkerSystemUuid'],
};

const parse = {
  item: {
    ...genericFields,
    location: 'location',
    file: 'file',
    config: 'config',
  },
  remove: ['milemarkerSystemUuid'],
};

const api = {
  item: {
    ...genericFields,
    getData: 'getData',
    postData: 'postData',
  },
  remove: ['milemarkerSystemUuid'],
};

const createFile = {
  item: {
    ...genericFields,
    location: 'location',
    file: 'file',
    config: 'config',
  },
  remove: ['milemarkerSystemUuid'],
};

const convertFile = {
  item: {
    ...genericFields,
    fileType: 'fileType',
  },
  remove: ['milemarkerSystemUuid'],
};

const getFile = {
  item: {
    ...genericFields,
    key: 'key',
    secret: 'secret',
  },
  remove: ['milemarkerSystemUuid'],
};

const mojo = {
  item: {
    ...genericFields,
    key: 'key',
    secret: 'secret',
  },
  remove: ['milemarkerSystemUuid'],
};

const getData = {
  item: {
    ...genericFields,
    location: {
      source: 'location',
    },
    config: 'config',
  },
  remove: ['milemarkerSystemUuid'],
};

module.exports = {
  move,
  parse,
  api,
  createFile,
  convertFile,
  getFile,
  mojo,
  getData,
};
