const axios = require("axios");
const configurator = require("../../config/configurator");
const { logger, config } = configurator();

module.exports = async function (req, res, next) {
  if (req.steamID == null) {
    axios
      .get(process.env.RESOLVE_VANITY_URL, {
        params: { key: process.env.API_KEY, vanityurl: req.vanityURL },
      })
      .then(function (response) {
        req.steamID = response.data.response.steamid;
        next();
      })
      .catch(function (error) {
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
      });
  } else {
    next();
  }
};
