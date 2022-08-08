const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { taskService, queueService } = require('../services');
const QUEUE_NAMES = require('../config/queues');
const { hashtag } = require('../config/config');

const createTask = catchAsync(async (req, res) => {
  const BODY = {
    hashtag,
    createdBy: req.user._id,
  };
  const taskCreated = await taskService.createTask(BODY);
  if (!taskCreated) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Task not created');
  }

  // push data into the queue
  BODY.taskId = taskCreated.id;
  queueService.createJob(QUEUE_NAMES.RECENT_TWEETS.name, BODY);

  const task = await taskService.queryTasks({ _id: taskCreated.id }, { populate: 'createdBy' });
  if (!task) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Task not created');
  }
  res.status(httpStatus.CREATED).send(task);
});

const listTask = catchAsync(async (req, res) => {
  const filter = {
    createdBy: req.user._id,
    isDeleted: false,
  };
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  options.populate = 'createdBy';
  const result = await taskService.queryTasks(filter, options);
  res.send(result);
});

const completedTask = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['taskId']);
  if (filter.taskId) {
    filter._id = filter.taskId;
    delete filter.taskId;
  }
  filter.createdBy = req.user._id;
  filter.status = 'completed';
  filter.isDeleted = false;
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  options.populate = 'createdBy';
  const result = await taskService.queryTasks(filter, options);
  res.send(result);
});

module.exports = {
  createTask,
  listTask,
  completedTask,
};
