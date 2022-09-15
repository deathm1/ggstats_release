const configurator = require("../../config/configurator");
const { config, logger } = configurator();
const axios = require("axios");

module.exports = async function (req, res, next) {
  try {
    if (req.body.platform == 0) {
      axios
        .get(process.env.GET_USER_STATS_FOR_GAME, {
          params: {
            key: process.env.API_KEY,
            appid: appId,
            steamid: steamHandle,
          },
        })
        .then(function (response) {})
        .catch(function (error) {
          logger.systemLogger.error(
            `Something went wrong while fetching data from STEAM ID ${get_sharableLink.handle}, Error Message => [${error}]`
          );
          res.status(503).json({
            success: false,
            status: `Something went wrong while fetching data from STEAM ID ${get_sharableLink.handle}.`,
            timestamp: Date.now(),
          });
        });
    } else {
      next();
    }
  } catch (error) {
    if (logger != undefined) {
      logger.systemLogger.info(error.stack);
      logger.systemLogger.error(
        `Internal Server Error : Error Message [${error.stack}]`
      );
      res.status(503).json({
        status: "Internal Server Error",
        success: false,
        timestamp: Date.now(),
      });
    } else {
      console.log(error);
    }
  }
};
