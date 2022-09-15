const express = require("express");
const router = express.Router();
const configurator = require("./config/configurator");
const { config, logger } = configurator();

router.get("/", async (req, res) => {
  try {
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
});

module.exports = router;
