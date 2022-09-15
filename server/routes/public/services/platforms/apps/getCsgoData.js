const axios = require("axios");

module.exports = async (steamHandle, appId) => {
  return axios.get(process.env.GET_USER_STATS_FOR_GAME, {
    params: {
      key: process.env.API_KEY,
      appid: appId,
      steamid: steamHandle,
    },
  });
};
