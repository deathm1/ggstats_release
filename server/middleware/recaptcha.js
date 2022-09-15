const configurator = require("../config/configurator");
const { logger, config } = configurator();
const axios = require("axios");

module.exports = async function (req, res, next) {
  try {
    if (parseInt(process.env.ENVIRONMENT) == 0) {
      next();
    } else {
      const response = req.header("response");
      if (response == null || response == "") {
        res
          .status(400)
          .json({
            success: false,
            status:
              "Recaptch verfication failed, response token was not included.",
          })
          .end();
      } else {
        const url =
          process.env.VERIFY_URL +
          "?secret=" +
          process.env.SERVER_SECRET +
          "&response=" +
          response;

        axios
          .post(url)
          .then(function (response) {
            if (!response.data.success) {
              res
                .status(400)
                .json({
                  success: false,
                  status: "Recaptch verfication failed, please try again.",
                  timestamp: Date.now(),
                })
                .end();
            } else if (
              parseInt(response.data.score) < parseInt(process.env.SCORE)
            ) {
              res
                .status(401)
                .json({
                  success: false,
                  status: "Recaptcha verification failed, please try again.",
                  timestamp: Date.now(),
                })
                .end();
            } else if (response.data.success) {
              next();
            }
          })
          .catch(function (error) {
            logger.systemLogger.error(error.stack);
            res
              .status(400)
              .json({
                success: false,
                status: "Recaptcha verification failed, please try again.",
                timestamp: Date.now(),
              })
              .end();
          });
      }
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
