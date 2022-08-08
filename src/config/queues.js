/* eslint-disable global-require */
module.exports = {
  RECENT_TWEETS: {
    name: `${process.env.NODE_ENV}-RECENT_TWEETS-QUEUE`,
    worker: require('../worker/consumers/recentTweets'),
  },
};
