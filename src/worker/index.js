const mongoose = require('mongoose');
const logger = require('../config/logger');
const config = require('../config/config');
const { queueService } = require('../services');
const QUEUE_NAMES = require('../config/queues');

const processWorkers = async (eachQueueName) => {
  const { name, worker } = QUEUE_NAMES[eachQueueName];
  const QueueInstance = queueService.getQueueInstance(name);
  QueueInstance.process(async (job, done) => {
    logger.info(`Processing job ${job.id}`);
    const result = await worker.execute(job.data);
    return done(null, result);
  });
  logger.info(`listening to queue: ${name}`);
};
const start = async () => {
  mongoose.connect(config.mongoose.url, config.mongoose.options).then(async () => {
    logger.info('Connected to MongoDB');
    const KEYS = Object.keys(QUEUE_NAMES);
    await Promise.all(KEYS.map(processWorkers));
  });
};
start();
