const { twitterService } = require('../../services');
const { Task } = require('../../models');

const updateTaskStatusRunning = async (taskId, startTime) => {
  await Task.findOneAndUpdate(
    {
      _id: taskId,
    },
    {
      status: 'running',
      startedAt: new Date(startTime),
    }
  );
};

const updateTaskStatusCompleted = async (taskId, metaInfo, numOfTweets, startTime) => {
  const endTime = new Date();
  await Task.findOneAndUpdate(
    {
      _id: taskId,
    },
    {
      metaInfo,
      numOfTweets,
      status: 'completed',
      completedAt: endTime,
      timeTaken: +endTime - startTime,
    }
  );
};

const updateTaskStatusError = async (taskId, error) => {
  await Task.findOneAndUpdate(
    {
      _id: taskId,
    },
    {
      status: 'error',
      error,
    }
  );
};

const fetchTweetsResult = async (hashtag) => {
  const [userTweetData, userTweetDataCount] = await Promise.all([
    twitterService.fetchRecentTweets(hashtag),
    twitterService.fetchTweetsCount(hashtag),
  ]);
  return {
    metaInfo: userTweetData.data,
    numOfTweets: userTweetDataCount.meta.total_tweet_count,
  };
};

const execute = async (data) => {
  const startTime = +new Date();
  try {
    // update task status to running
    await updateTaskStatusRunning(data.taskId, new Date(startTime));

    // fetch recent tweets and total tweet count parallel
    const { metaInfo, numOfTweets } = await fetchTweetsResult(data.hashtag);

    // update received data and status to completed
    await updateTaskStatusCompleted(data.taskId, metaInfo, numOfTweets, startTime);
  } catch (ex) {
    // update task on error occurred
    await updateTaskStatusError(data.taskId, ex);
  }
  return data;
};

module.exports = {
  execute,
};
