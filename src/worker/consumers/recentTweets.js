const { twitterService } = require('../../services');
const { Task } = require('../../models');

const execute = async (data) => {
  // update task status to running
  await Task.findOneAndUpdate(
    {
      _id: data.taskId,
    },
    {
      status: 'running',
      startedAt: new Date(),
    }
  );

  // fetch recent tweets and total tweet count parallel
  const [userTweetData, userTweetDataCount] = await Promise.all([
    twitterService.fetchRecentTweets(data.hashtag),
    twitterService.fetchTweetsCount(data.hashtag),
  ]);

  // update received data and status to completed
  await Task.findOneAndUpdate(
    {
      _id: data.taskId,
    },
    {
      metaInfo: userTweetData.data,
      numOfTweets: userTweetDataCount.meta.total_tweet_count,
      status: 'completed',
      completedAt: new Date(),
    }
  );
  return userTweetData;
};

module.exports = {
  execute,
};
