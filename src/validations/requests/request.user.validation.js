const Joi = require('joi');

const user = {
  customerNumber: Joi.number().integer().min(1).required(),
  username: Joi.string().required(),
  ownerId: Joi.string().required(),
  id: Joi.string().required(),
};

module.exports = user;
