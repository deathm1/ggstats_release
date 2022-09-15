const express = require("express");
const router = express.Router();
const configurator = require("../../../../config/configurator");
const { logger } = configurator();
const recaptcha = require("../../../../middleware/recaptcha");
const { check, validationResult } = require("express-validator");

//Middleware
const steamIDDetector = require("../../../../middleware/steamMiddleware/steamIDDetector");
const steamNumericIDGetter = require("../../../../middleware/steamMiddleware/steamNumericIDGetter");
const getUserStatsByID = require("../../../../middleware/steamMiddleware/getUserStatsById");
const getPlayerSummaries = require("../../../../middleware/steamMiddleware/getPlayerSummaries");
router.post(
  "/",
  //   recaptcha,
  [
    check(
      "handle",
      "Please include a handle name to fetch details."
    ).notEmpty(),
  ],
  steamIDDetector,
  steamNumericIDGetter,
  getPlayerSummaries,
  getUserStatsByID,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          status: "Missing parameters, Please include all the details.",
          errors: errors.array(),
        });
      } else {
        if (logger != null) {
          logger.systemLogger.info(`Fetching data for, ${req.body.handle}`);
        }
        res.status(200).json({
          success: true,
          status: `Data from STEAM API has been fetched for ID ${req.steamID}.`,
          steamID: req.steamID,
          csgoData: req.data,
          playerSummary: req.playerSummary,
          timestamp: Date.now(),
        });
      }
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
  }
);

module.exports = router;
