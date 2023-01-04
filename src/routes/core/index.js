const express = require('express');
const statusRoute = require('./status.route');
const tenancyRoute = require('./tenancy.route');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const apiRoute = require('./api.route');
const credentialRoute = require('./credential.route'); // TODO
// const objectRoute = require('./object.route'); // TODO
// const boxRoute = require('./box.route'); // TODO
const connectionRoute = require('./connection.route');
const locationRoute = require('./location.route');
const taskRoute = require('./task.route');
const scheduleRoute = require('./schedule.route');
const jobRoute = require('./job.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/status',
    route: statusRoute,
  },
  {
    path: '/tenancy',
    route: tenancyRoute,
  },
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/apis',
    route: apiRoute,
  },
  // {
  //   path: '/objects',
  //   route: objectRoute,
  // },
  // {
  //   path: '/boxes',
  //   route: boxRoute,
  // },
  {
    path: '/connections',
    route: connectionRoute,
  },
  {
    path: '/credentials',
    route: credentialRoute,
  },
  {
    path: '/locations',
    route: locationRoute,
  },
  {
    path: '/tasks',
    route: taskRoute,
  },
  {
    path: '/schedules',
    route: scheduleRoute,
  },
  {
    path: '/jobs',
    route: jobRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
