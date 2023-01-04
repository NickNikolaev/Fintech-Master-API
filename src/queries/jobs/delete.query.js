const generateDeleteJobByIdQuery = (id, customerNumber) => `CALL MILEMARKER.FOXTROT_JOB_DELETE(${id}, ${customerNumber})`;

module.exports = {
  generateDeleteJobByIdQuery,
};
