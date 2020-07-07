import axios from "axios";

import Constants from "../constants/Constants";

export const getThisMonthTweets = (date) => {
  const res = axios.post(`${Constants.BASE_URL}/api/getThisMonthTweets`, {
    date,
  });

  return res;
};

export const getTweetsByMonth = (date) => {
  const res = axios.post(`${Constants.BASE_URL}/api/getAllTweetsByMonth`, {
    date,
  });

  return res;
};
