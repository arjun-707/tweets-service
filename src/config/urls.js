module.exports = {
  twitterUrls: {
    domain: 'https://api.twitter.com',
    endpoints: {
      oauth2Token: '/oauth2/token',
      recentSearch: '/2/tweets/search/recent?query=%s',
      recentCount: '/2/tweets/counts/recent?query=%s',
    },
  },
};
