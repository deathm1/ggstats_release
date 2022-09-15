// imports
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const configurator = require("./config/configurator");
const { config, logger } = configurator();
const { connectDB } = require("./config/databaseConnection");

connectDB().then(function (wasConnectionEstablished) {
  if (wasConnectionEstablished) {
    const helmet = require("helmet");
    var cors = require("cors");
    // end

    const app = express();
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(helmet());
    app.use(
      cors({
        origin: [
          "http://localhost:3000",
          "http://localhost:8080",
          "http://localhost:4200",
          "http://localhost:2083",
        ],
        credentials: true,
      })
    );

    try {
      if (logger != undefined) {
        logger.systemLogger.info("Launching routes...");
      }

      app.use(
        "/api/generateSharableLinks",
        require("./routes/public/services/sharableLink/generateSharableLink")
      );
      app.use(
        "/api/getSharableLink",
        require("./routes/public/services/sharableLink/getSharableLink")
      );

      app.use(
        "/api/queryHandler/steamQueryNormalizer",
        require("./routes/public/services/queryHandler/steamQueryNormalizer")
      );

      app.use(
        "/api/queryHandler/0",
        require("./routes/public/services/queryHandler/getCSGOData")
      );

      if (logger != undefined) {
        logger.systemLogger.info("All routes launched successfully.");
      }
    } catch (error) {
      console.log(error);
      if (logger != undefined) {
        logger.systemLogger.info(error.stack);
        logger.systemLogger.error(
          "Something went wrong while initializing routes."
        );
      }
    }

    app.listen(process.env.PORT, () => {
      console.log(
        `ggstats.in server is running at secure PORT : ${process.env.PORT}\n`
      );
      if (logger != undefined) {
        logger.systemLogger.info(
          `ggstats.in server is running at secure PORT : ${process.env.PORT}`
        );
      }
    });
  } else {
    if (logger != undefined) {
      logger.systemLogger.error(
        "Terminating server as connection with database was not established."
      );
    }
    process.exit(1);
  }
});
