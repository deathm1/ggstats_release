const express = require("express");
const router = express.Router();
const recaptcha = require("../../../../middleware/recaptcha");
const configurator = require("../../../../config/configurator");
const { logger } = configurator();
const { check, validationResult } = require("express-validator");

//data models
const sharableLinks = require("../../../../Models/Services/sharableLinks");

//services
const getCsgoData = require("../platforms/apps/getCsgoData");

router.post(
  "/",
  recaptcha,
  [
    check("sharebleString", "Error, Sharable string is invalid.")
      .isLength({
        min: 6,
        max: 6,
      })
      .notEmpty(),
  ],
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
          logger.systemLogger.info(
            `Fetching data for, ${req.body.sharebleString}`
          );
        }
        const get_sharableLink = await sharableLinks.findOne({
          id: req.body.sharebleString,
        });

        if (get_sharableLink == null || get_sharableLink == undefined) {
          res.status(400).json({
            success: false,
            status: `Sorry, sharable link ${req.body.sharebleString} is expired or invalid.`,
            errors: errors.array(),
          });
        } else if (get_sharableLink.revokeTime < Date.now()) {
          res.status(400).json({
            success: false,
            status: `Sorry, sharable link ${req.body.sharebleString} is expired or invalid.`,
            errors: errors.array(),
          });
        } else {
          res.status(200).json({
            success: true,
            status: `Sharable link ${req.body.sharebleString} was valid and related data has been fetched.`,
            data: get_sharableLink,
          });
        }
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
