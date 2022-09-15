const axios = require("axios");
const configurator = require("../../config/configurator");
const { logger, config } = configurator();

module.exports = async function (req, res, next) {
  try {
    const steamId = req.steamID;
    const appId = process.env.CSGO_ID;
    axios
      .get(process.env.GET_PLAYER_SUMMARIES, {
        params: {
          key: process.env.API_KEY,
          steamids: steamId,
        },
      })
      .then(function (response) {
        if (response.data != undefined || response.data != null) {
          req.playerSummary = response.data.response.players[0];
          next();
        } else {
          if (logger != undefined) {
            logger.systemLogger.error(
              `Something went wrong, Error Message => [${error}]`
            );

            req.playerSummary = null;
            next();
          } else {
            console.log(error);
          }
        }
      })
      .catch(function (error) {
        if (logger != undefined) {
          logger.systemLogger.error(
            `Something went wrong, Error Message => [${error}]`
          );
          req.playerSummary = null;
          next();
        } else {
          console.log(error);
        }
      });
  } catch (error) {
    console.log(error);
    if (logger != undefined) {
      logger.systemLogger.error(
        `Something went wrong, Error Message => [${error}]`
      );
      req.playerSummary = null;
      next();
    } else {
      console.log(error);
    }
  }
};
