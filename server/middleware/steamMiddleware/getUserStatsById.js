const axios = require("axios");
const configurator = require("../../config/configurator");
const { logger, config } = configurator();

module.exports = async function (req, res, next) {
  try {
    const steamId = req.steamID;
    const appId = process.env.CSGO_ID;
    axios
      .get(process.env.GET_USER_STATS_FOR_GAME, {
        params: {
          key: process.env.API_KEY,
          appid: appId,
          steamid: steamId,
        },
      })
      .then(function (response) {
        if (response.data != undefined || response.data != null) {
          req.data = response.data.playerstats;
          next();
        } else {
          if (logger != undefined) {
            logger.systemLogger.error(
              `Something went wrong, Error Message => [${error}]`
            );
            res
              .status(500)
              .json({
                success: false,
                status: "Something went wrong",
              })
              .end();
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
          res
            .status(500)
            .json({
              success: false,
              status: "Something went wrong",
            })
            .end();
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
      res.status(500).json({
        success: false,
        status: "Something went wrong",
      });
    } else {
      console.log(error);
    }
  }
};
