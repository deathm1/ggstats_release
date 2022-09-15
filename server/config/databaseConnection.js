const mongoose = require("mongoose");
const configurator = require("./configurator");
const { config, logger } = configurator();
const { check, validationResult } = require("express-validator");

const connectDB = async () => {
  try {
    await mongoose.connect(
      parseInt(process.env.ENVIRONMENT) == 1
        ? process.env.CONNECTION_STRING_PRODUCTION
        : process.env.CONNECTION_STRING_DEVELOPMENT
    );
    if (logger != undefined) {
      logger.systemLogger.info(
        `Connection with ${process.env.TYPE} has been established successfully.`
      );
    }
    return true;
  } catch (err) {
    if (logger != undefined) {
      logger.systemLogger.error(
        `Connection with database was not established. Error Message => [${err.message}]`
      );
    }
    return false;
  }
};
module.exports = { connectDB };
