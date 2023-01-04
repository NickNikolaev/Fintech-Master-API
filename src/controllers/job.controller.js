const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const jobService = require('../services/job.service');
const mountResponse = require('../utils/mountResponse');
const { transform } = require('../models/plugins');
const { jobSchema } = require('../models');
const { scheduleService } = require('../services');

/**
 * Controller Function: Create job
 * Endpoint: POST /jobs
 */
const createJob = catchAsync(async (req, res) => {
  const user = pick(req.user, ['customerNumber', 'username']);
  const body = pick(req.body, ['boxId', 'schedule', 'name', 'description', 'tasks']);

  // Get schedule by id and Reassign it to req.body.schedule
  const scheduleId = body.schedule;
  body.schedule = await scheduleService.getScheduleById(user, { scheduleId });

  // Create job
  const job = await jobService.createJob(user, body);

  // Return response
  const args = { data: job };
  mountResponse(res, httpStatus.CREATED, args);
});

/**
 * Controller Function: Start job
 * Endpoint: POST /jobs/start
 */
const startJob = catchAsync(async (req, res) => {
  const user = pick(req.user, ['customerNumber', 'username']);
  const body = pick(req.body, ['boxId', 'tasks']);

  // Start job
  await jobService.startJob(user, body);

  // Return response
  // TODO: Add handling for success messages in mountResponse
  mountResponse(res, httpStatus.CREATED);
});

/**
 * Controller Function: Get all jobs
 * Endpoint: GET /jobs
 * @type {(function(*=, *=, *=): void)|*}
 */
const getJobs = catchAsync(async (req, res) => {
  const user = pick(req.user, ['customerNumber']);
  const options = pick(req.query, ['size', 'page', 'sortBy', 'orderBy', 'where', 'cache']);
  const filter = pick(req.query, [
    'milemarkerSystemId',
    'milemarkerSystemInserted',
    'milemarkerSystemInsertedBy',
    'milemarkerSystemUpdated',
    'milemarkerSystemUpdatedBy',
    'milemarkerSystemUuid',
    'customerNumber',
    'name',
    'data',
    'type',
    'priority',
    'repeatInterval',
    'repeatTimeZone',
    'lastModifiedBy',
  ]);

  // Query jobs
  // TODO: Implement pagination in jobService.queryJobs
  const jobs = await jobService.queryJobs(user, options, filter);
  // const { results, page, size, totalPages, totalResults, query } = jobs;

  // Transform job data
  const data = transform(jobs, jobSchema);

  // Return response
  const args = {
    data,
    // summary: {
    //   page,
    //   size,
    //   totalPages,
    //   totalResults,
    // },
    // metaData: { query },
  };
  mountResponse(res, httpStatus.OK, args);
});

/**
 * Controller Function: Get a job by id
 * Endpoint: GET /jobs/:jobId
 */
const getJob = catchAsync(async (req, res) => {
  const user = pick(req.user, ['customerNumber']);
  const params = pick(req.params, ['jobId']);

  // Get a job by id
  const job = await jobService.getJobById(user, params);

  // Transform job data
  const data = transform(job, jobSchema);

  // Return response
  const args = { data };
  mountResponse(res, httpStatus.OK, args);
});

/**
 * Controller Function: Update job by id
 * Endpoint: PUT /jobs/:jobId
 */
const updateJob = catchAsync(async (req, res) => {
  const user = pick(req.user, ['username', 'customerNumber']);
  const params = pick(req.params, ['jobId']);
  const body = pick(req.body, ['name', 'description', 'tasks', 'schedule', 'disabled']);

  // Update job by id
  const job = await jobService.updateJobById(user, params, body);

  // Return response
  const args = { data: job };
  mountResponse(res, httpStatus.OK, args);
});

/**
 * Controller Function: Delete job by id
 * Endpoint: DELETE /jobs/:jobId
 */
const deleteJob = catchAsync(async (req, res) => {
  const user = pick(req.user, ['customerNumber', 'username']);
  const params = pick(req.params, ['jobId']);

  // Delete job by id
  await jobService.deleteJobById(user, params);

  // Return no content
  mountResponse(res, httpStatus.NO_CONTENT);
});

module.exports = {
  createJob,
  startJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob,
};
