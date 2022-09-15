const configurator = require("../config/configurator");
const { logger, config } = configurator();
const axios = require("axios");
const sharableLinks = require("../Models/Services/sharableLinks");
module.exports = async function (req, res, next) {
  try {
    const getAllSharableLinks = await sharableLinks.find();
    for (var i = 0; i < getAllSharableLinks.length; i++) {
      if (getAllSharableLinks[i].urlExpired < Date.now()) {
        await sharableLinks.findOneAndRemove({ id: getAllSharableLinks[i].id });
      }
    }
    next();
  } catch (error) {
    logger.systemLogger.info(error.stack);
    logger.systemLogger.error(
      `Internal Server Error : Error Message [${error.stack}]`
    );
    res
      .status(503)
      .json({
        status: "Internal Server Error",
        success: false,
        timestamp: Date.now(),
      })
      .end();
  }
};
