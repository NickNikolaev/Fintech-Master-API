const Joi = require('joi');

const options = {
  size: Joi.alternatives().try(Joi.number().integer().min(1), Joi.string().equal('all')),
  page: Joi.number().integer().min(1),
  sortBy: Joi.string(),
  orderBy: Joi.string(),
  where: Joi.string(),
  cache: Joi.boolean(),
};

module.exports = {
  options,
};
