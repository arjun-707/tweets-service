const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const taskSchema = mongoose.Schema(
  {
    hashtag: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['queued', 'running', 'error', 'started', 'completed', 'cancelled'],
      default: 'queued',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    numOfTweets: {
      type: Number,
    },
    timeTaken: {
      type: Number,
    },
    metaInfo: {},
    completedAt: {
      type: Date,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedBy: {
      type: String,
    },
    error: {},
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
taskSchema.plugin(toJSON);
taskSchema.plugin(paginate);

/**
 * @typedef Task
 */
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
