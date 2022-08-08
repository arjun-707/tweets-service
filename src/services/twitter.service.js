const axios = require('axios');
const util = require('util');
const qs = require('qs');
const { twitterCredentials } = require('../config/config');
const { twitterUrls } = require('../config/urls');

let ACCESS_TOKEN;

// to get access token through consumerKey and consumerSecret
const refreshAccessToken = async () => {
  const token = `${twitterCredentials.consumerKey}:${twitterCredentials.consumerSecret}`;
  const encodedToken = Buffer.from(token).toString('base64');
  const axiosOption = {
    url: `${twitterUrls.domain}${twitterUrls.endpoints.oauth2Token}`,
    method: 'post',
    headers: {
      Authorization: `Basic ${encodedToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify({
      mode: 'urlencoded',
      urlencoded: 'grant_type=client_credentials',
      grant_type: 'client_credentials',
    }),
  };
  try {
    const { status, data } = await axios(axiosOption);
    if (status === 200) return data;
    throw new Error('something went with twitter access token api');
  } catch (ex) {
    let error;
    if (ex && ex.response && ex.response.data) error = ex.response.data;
    else if (ex.message) error = ex.message;
    throw new Error(error);
  }
};

// fetch the recent tweets for given #hashtag
const fetchRecentTweets = async (hashtag) => {
  try {
    if (!ACCESS_TOKEN) {
      // eslint-disable-next-line camelcase
      const { access_token } = await refreshAccessToken();
      // eslint-disable-next-line camelcase
      ACCESS_TOKEN = access_token;
    }
    const axiosOption = {
      url: util.format(`${twitterUrls.domain}${twitterUrls.endpoints.recentSearch}`, hashtag),
      method: 'get',
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    };
    const { status, data } = await axios(axiosOption);
    if (status === 200) return data;
    throw new Error('something went with twitter recent tweet api');
  } catch (ex) {
    let error;
    if (ex && ex.response && ex.response.data) error = ex.response.data;
    else if (ex.message) error = ex.message;
    throw new Error(error);
  }
};

// fetch the total tweet for given #hashtag
const fetchTweetsCount = async (hashtag) => {
  try {
    if (!ACCESS_TOKEN) {
      // eslint-disable-next-line camelcase
      const { access_token } = await refreshAccessToken();
      // eslint-disable-next-line camelcase
      ACCESS_TOKEN = access_token;
    }
    const axiosOption = {
      url: util.format(`${twitterUrls.domain}${twitterUrls.endpoints.recentCount}`, hashtag),
      method: 'get',
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    };
    const { status, data } = await axios(axiosOption);
    if (status === 200) return data;
    throw new Error('something went with twitter recent tweet api');
  } catch (ex) {
    let error;
    if (ex && ex.response && ex.response.data) error = ex.response.data;
    else if (ex.message) error = ex.message;
    throw new Error(error);
  }
};

module.exports = {
  fetchRecentTweets,
  fetchTweetsCount,
};
