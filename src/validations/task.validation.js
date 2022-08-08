const Joi = require('joi');

const createTask = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    assignedTo: Joi.string().required(),
    status: Joi.string(),
    priority: Joi.string(),
  }),
};

const listTask = {
  query: Joi.object().keys({
    taskId: Joi.string(),
    status: Joi.string(),
    createdBy: Joi.string(),
    numOfTweets: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const completedTask = {
  query: Joi.object().keys({
    taskId: Joi.string(),
    createdBy: Joi.string(),
    numOfTweets: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createTask,
  listTask,
  completedTask,
};
