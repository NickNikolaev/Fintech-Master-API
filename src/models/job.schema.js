const jobSchema = {
  item: {
    id: '_id',
    name: 'name',
    data: 'data',
    priority: 'priority',
    type: 'type',
    nextRunAt: 'nextRunAt',
    repeatInterval: 'repeatInterval',
    repeatTimezone: 'repeatTimezone',
    startDate: 'startDate',
    endDate: 'endDate',
    skipDays: 'skipDays',
    lastModifiedBy: 'lastModifiedBy',
  },
};

module.exports = jobSchema;
