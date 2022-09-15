const express = require("express");
const router = express.Router();
const configurator = require("../../../../config/configurator");
const { logger } = configurator();
const recaptcha = require("../../../../middleware/recaptcha");
const { check, validationResult } = require("express-validator");

//services
const getCsgoData = require("../platforms/apps/getCsgoData");

router.post(
  "/",
  recaptcha,
  [
    check("platform", "Enter platform to fetch user profile.").notEmpty(),
    check(
      "handle",
      "Please include a handle name to fetch details."
    ).notEmpty(),
  ],
  async (req, res) => {
    try {
      const { platform, handle } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          status: "Missing parameters, Please include all the details.",
          errors: errors.array(),
        });
      } else {
        logger.systemLogger.info(`Fetching data for, ${platform}, ${handle}`);
      }
    } catch (error) {
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
