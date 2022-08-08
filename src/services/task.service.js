const httpStatus = require('http-status');
const { Task } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Task
 * @param {Object} taskBody
 * @returns {Promise<Task>}
 */
const createTask = async (taskBody) => {
  return Task.create(taskBody);
};

/**
 * Query for task
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryTasks = async (filter, options) => {
  // eslint-disable-next-line no-param-reassign
  filter.isDeleted = false;
  const task = await Task.paginate(filter, options);
  return task;
};

/**
 * Query for task
 * @param {Object} filter - Mongo filter
 * @returns {Promise<count>}
 */
const countTasks = async (filter) => {
  // eslint-disable-next-line no-param-reassign
  filter.isDeleted = false;
  const count = await Task.count(filter);
  return count;
};

/**
 * Get task by id
 * @param {ObjectId} id
 * @returns {Promise<Task>}
 */
const getTaskById = async (id) => {
  return Task.findOne({
    _id: id,
    isDeleted: false,
  });
};

/**
 * Update task by id
 * @param {ObjectId} taskId
 * @param {Object} updateBody
 * @returns {Promise<Task>}
 */
const updateTaskById = async (taskId, updateBody) => {
  const task = await getTaskById(taskId);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }
  Object.assign(task, updateBody);
  await task.save();
  return task;
};

module.exports = {
  createTask,
  queryTasks,
  countTasks,
  getTaskById,
  updateTaskById,
};
