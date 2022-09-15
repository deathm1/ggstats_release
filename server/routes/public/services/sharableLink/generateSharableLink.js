const express = require("express");
const router = express.Router();
const configurator = require("../../../../config/configurator");
const { logger } = configurator();
const recaptchaVerification = require("../../../../middleware/recaptcha");
const expiredLinksHandler = require("../../../../middleware/expiredLinksHandler");
const { check, validationResult } = require("express-validator");
// Database Schemas
const sharableLinks = require("../../../../Models/Services/sharableLinks");

router.post(
  "/",
  [
    check(
      "handle",
      "Enter platform / app handle to fetch user profile."
    ).notEmpty(),
    check(
      "platformName",
      "Please include a valid platform / app name."
    ).notEmpty(),
    check(
      "endPoint",
      "Please include a valid platform / app endpoint."
    ).notEmpty(),
  ],
  recaptchaVerification,
  expiredLinksHandler,
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
        const { handle, platformName, endPoint } = req.body;
        if (logger != undefined) {
          logger.systemLogger.info(
            `Handle : ${handle}, Platform : ${platformName}, End Point : ${endPoint}, processing initialized...`
          );
        }
        let fetchAll = await sharableLinks.find();
        var fetchService = undefined;
        for (var i = 0; i < fetchAll.length; i++) {
          if (fetchAll[i].revokeTime < Date.now()) {
            await sharableLinks.deleteOne({ id: fetchAll[i].id });
          } else if (
            fetchAll[i].handle == req.body.handle
            // &&
            // fetchAll[i].endPoint == fetchService.endPoint
          ) {
            fetchService = fetchAll[i];
          }
        }
        if (
          (fetchService != null || fetchService != undefined) &&
          Date.now() < fetchService.revokeTime
        ) {
          if (logger != undefined) {
            logger.systemLogger.warn(
              `Record already exists, forwarding stored info.`
            );
          }

          res.status(200).json({
            success: true,
            status: "Link Already Generated",
            handle: fetchService.handle,
            id: `${req.protocol}://ggstats.in/${fetchService.id}`,
            endPoint: fetchService.endPoint,
            generateTime: fetchService.urlGenerated,
            revokeTime: fetchService.urlExpired,
            timestamp: Date.now(),
          });
        } else {
          var myUniqueId = "";
          var genflag = true;
          while (genflag) {
            myUniqueId = makeid(6);
            const fetchUser = await sharableLinks.findOne({ id: myUniqueId });
            if (fetchUser == undefined || fetchService == null) {
              genflag = false;
            }
          }
          const my_exp = Date.now() + 900000;
          service = sharableLinks({
            id: myUniqueId,
            handle: handle,
            name: platformName,
            endPoint: endPoint,
            generateTime: Date.now(),
            revokeTime: my_exp,
            active: true,
          });
          await service.save();
          res.status(200).json({
            success: true,
            status: "Link Successfully Generated",
            id: `${req.protocol}://${req.headers.host}/${myUniqueId}`,
            handle: handle,
            name: platformName,
            endPoint: endPoint,
            revokeTime: my_exp,
            timestamp: Date.now(),
          });
        }
      }
    } catch (error) {
      if (logger != undefined) {
        logger.systemLogger.error(
          `Something went wrong while fetching server status, Error Message => [${error}]`
        );
        res.status(500).json({
          success: false,
          status: "Something went wrong while fetching Server Status.",
        });
      } else {
        console.log(error);
      }
    }
  }
);

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
module.exports = router;
