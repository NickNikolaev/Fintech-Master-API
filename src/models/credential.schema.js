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
};

const ftp = {
  item: {
    ...genericFields,
    username: 'username',
    password: 'password',
    encryption: 'encryption',
  },
  remove: ['milemarkerSystemUuid'],
};

const google = {
  item: {
    ...genericFields,
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    expiryDate: 'expiryDate',
  },
  remove: ['milemarkerSystemUuid'],
};

const dropbox = {
  item: {
    ...genericFields,
    token: 'token',
  },
  remove: ['milemarkerSystemUuid'],
};

const aws = {
  item: {
    ...genericFields,
    key: 'key',
    secret: 'secret',
  },
  remove: ['milemarkerSystemUuid'],
};

const api = {
  item: {
    ...genericFields,
    authentication: 'authentication',
  },
  remove: ['milemarkerSystemUuid'],
};

module.exports = {
  ftp,
  google,
  dropbox,
  aws,
  api,
};
