/* eslint-disable no-console */
const Queue = require('bee-queue');
const { redisCredentials } = require('../config/config');

const QUEUES_INSTANCES = {};

const getQueueInstance = (queueName) => {
  if (QUEUES_INSTANCES[queueName]) return QUEUES_INSTANCES[queueName];
  QUEUES_INSTANCES[queueName] = new Queue(queueName, redisCredentials);
  return QUEUES_INSTANCES[queueName];
};

const createJob = (queueName, message) => {
  if (!QUEUES_INSTANCES[queueName]) getQueueInstance(queueName);
  const job = QUEUES_INSTANCES[queueName].createJob(message);
  job.save();
  job.on('succeeded', (result) => {
    console.log(`Received result for job ${job.id}:`);
    console.table(result);
  });
};

module.exports = {
  getQueueInstance,
  createJob,
};
