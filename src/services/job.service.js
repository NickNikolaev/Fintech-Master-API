const mongoose = require('mongoose');
const Agenda = require('agenda');

// Get an instance of Agenda
const agenda = new Agenda({
  db: {
    address: process.env.MONGODB_URL,
    collection: 'agendaJobs',
  },
});

const httpStatus = require('http-status');
const { generateCreateJobQuery } = require('../queries/jobs/post.query');
const { executeQuery } = require('../config/snowflake');
const { generateGetJobReportByIdQuery } = require('../queries/jobs/get.query');
const errorMessages = require('../utils/errorMessages');
const ApiError = require('../utils/ApiError');
const paginate = require('../models/plugins/paginate.plugin');

const createJob = async (user, body) => {
  user.customerNumber = '999999';
  user.username = 'nick';

  // Create job in mongo
  console.log('body', body);
  const { name, description, boxId, tasks, schedule } = body;
  const jobData = {
    name,
    description,
    boxId,
    customerNumber: user.customerNumber,
    createdBy: user.username || 'milemarker',
    tasks,
  };
  const job = agenda.create(boxId.toString(), jobData);
  await job.repeatEvery(schedule.time).save();

  // Generate create job query and Execute it
  const createJobQuery = generateCreateJobQuery(user.customerNumber, job.attrs, user.username);
  return executeQuery(createJobQuery);
};

const startJob = async (user, body) => {
  user.customerNumber = '999999';
  user.username = 'nick';

  // Create job in mongo
  const { name, description, boxId, tasks } = body;
  const jobData = {
    name,
    description,
    boxId,
    customerNumber: user.customerNumber,
    createdBy: user.username || 'milemarker',
    tasks,
  };
  const job = agenda.create(boxId, jobData);

  // Generate create job query and Execute it
  const startJobQuery = generateCreateJobQuery(user.customerNumber, body, user.username || 'milemarker');
  await executeQuery(startJobQuery);

  // Start the job from agenda
  return agenda.now();
};

const queryJobs = async (user, options, filter) => {
  // Return the jobs from agenda
  user.customerNumber = '999999';
  const jobs = await agenda._collection.find({ 'data.customerNumber': user.customerNumber }).toArray();
  // return paginate(jobs);
  return jobs;
};

const getJobById = async (user, params) => {
  // Get job by id
  user.customerNumber = '999999';
  const job = await agenda._collection
    .find({
      _id: mongoose.Types.ObjectId(params.jobId),
      'data.customerNumber': user.customerNumber,
    })
    .toArray();

  // If job is not found -> Throw error
  if (job.length === 0) {
    const errorMessage = errorMessages.NOT_FOUND('job', params.jobId);
    throw new ApiError(httpStatus.NOT_FOUND, errorMessage);
  }

  // Return job
  return job[0];
};

// TODO: Do we even need this function ?
const getJobReportById = async (filter, user, query) => {
  // If the req.params.id is integer -> Get the job by id from snowflake
  if (Number.isInteger(filter.id)) {
    // Generate get job's report by id query
    const getJobReportByIdQuery = generateGetJobReportByIdQuery(user.customerNumber, filter.id);

    // TODO: Generate query filter by req.query and append it to "getJobReportByIdQuery"
    // TODO: Validate that such job's report exist

    // Get the job's report by id and Return it
    return executeQuery(getJobReportByIdQuery);
  }

  // If the req.params.id is a mongoose id -> Get the job by id from agenda
  const jobReportFilter = { ...query };
  mongoose.Types.ObjectId.isValid(filter.id)
    ? (jobReportFilter['meta.jobId'] = mongoose.Types.ObjectId(filter.id))
    : (jobReportFilter['meta.key.key'] = filter.id);

  // Get job reports and send them as response
  // TODO: Add jobs report model
  // return JobsReport.find(filter).sort({ _id: -1 }).exec();
};

const updateJobById = async (user, params, body) => {
  // Update mongo job by id
  const filter = { _id: mongoose.Types.ObjectId(params.jobId) };
  const update = {
    $set: {
      data: {
        name: body.name,
        description: body.description,
        tasks: body.tasks,
        schedule: body.schedule,
      },
      disabled: body.disabled,
    },
  };
  const job = await agenda._collection.update(filter, update);
  console.log('job', job);
  return job;

  // Generate update job by id query and Execute it
  user.customerNumber = '999999';
  user.username = 'nick';
  // const updateJobByIdQuery = generateUpdateJobByIdQuery(params.id, user.customerNumber, job, user.username || 'milemarker');
  // return executeQuery(updateJobByIdQuery);
};

const deleteJobById = async (user, params) => {
  // Delete mongo job by id
  await agenda._collection.deleteOne({ _id: mongoose.Types.ObjectId(params.jobId) });

  // TODO: How to get the snowflake id, when you have the mongo id

  // Generate delete job by id query and Execute it
  // const deleteJobByIdQuery = generateDeleteJobByIdQuery(params.id, user.customerNumber);
  // return executeQuery(deleteJobByIdQuery);
};

module.exports = {
  createJob,
  startJob,
  queryJobs,
  getJobById,
  getJobReportById,
  updateJobById,
  deleteJobById,
};
