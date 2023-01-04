const userRoles = [
  'getApis',
  'getProfile',
  'getCredentials',
  'getLocations',
  'getSchedules',
  'getTasks',
  'getJobs',
  'getConnections',
];

const allRoles = {
  user: userRoles,
  admin: [
    ...userRoles,
    'manageUsers',
    'manageApis',
    'manageCredentials',
    'manageLocations',
    'manageSchedules',
    'manageTasks',
    'manageJobs',
    'manageConnections',
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
