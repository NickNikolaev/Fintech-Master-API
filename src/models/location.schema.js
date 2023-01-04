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
    host: 'host',
    port: 'port',
    protocol: 'protocol',
    credentials: 'credentials',
    folder: 'folder',
  },
};

const google = {
  item: {
    ...genericFields,
    credentials: 'credentials',
  },
};

const dropbox = { ...google };

const api = {
  item: {
    ...genericFields,
    credentials: 'credentials',
    endpoint: 'endpoint',
    method: 'method',
    dataObject: 'dataObject',
    timeout: 'timeout',
    config: 'config',
  },
};

const dbConnection = {
  item: {
    ...genericFields,
    object: 'object',
  },
};

const s3 = {
  item: {
    ...genericFields,
    credentials: 'credentials',
    bucket: 'bucket',
    region: 'region',
    bucketFolder: 'bucketFolder',
  },
};

const glacier = {
  item: {
    ...genericFields,
    credentials: 'credentials',
    vault: 'vault',
    region: 'region',
  },
};

const dynamo = {
  item: {
    ...genericFields,
    credentials: 'credentials',
    table: 'table',
    region: 'region',
  },
};

const redshift = {
  item: {
    ...genericFields,
    credentials: 'credentials',
    username: 'username',
    password: 'password',
    database: 'database',
    port: 'port',
    host: 'host',
  },
};

module.exports = {
  ftp,
  google,
  dropbox,
  api,
  dbConnection,
  s3,
  glacier,
  dynamo,
  redshift,
};
