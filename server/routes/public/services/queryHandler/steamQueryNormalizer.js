const express = require("express");
const router = express.Router();
const configurator = require("../../../../config/configurator");
const recaptcha = require("../../../../middleware/recaptcha");
const { check, validationResult } = require("express-validator");
const { logger } = configurator();

//Middleware
const steamIDDetector = require("../../../../middleware/steamMiddleware/steamIDDetector");
const steamNumericIDGetter = require("../../../../middleware/steamMiddleware/steamNumericIDGetter");

router.post(
  "/",
  recaptcha,
  [
    check(
      "handle",
      "Please include a handle name to fetch details."
    ).notEmpty(),
  ],
  steamIDDetector,
  steamNumericIDGetter,
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
        if (logger != undefined) {
          logger.systemLogger.info(`Fetching data for, ${req.body.handle}`);
        }

        res.status(200).json({
          success: true,
          status: "Query has been converted to steam ID successfully.",
          steamId: req.steamID,
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
          status: "Something Went Wrong",
        });
      } else {
        console.log(error);
      }
    }
  }
);

module.exports = router;
