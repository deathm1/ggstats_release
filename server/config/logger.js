const { createLogger, format, transports } = require("winston");
const fs = require("fs");
const path = require("path");
const ini = require("ini");

const config = ini.parse(
  fs.readFileSync(path.join(__dirname, "./config.ini"), "utf-8")
);
const fileName = "system_log_" + getTime() + ".log";

// check if log folder exists
const mainDir = path.join(process.env.LOG_LOCATION, process.env.LOG_DIRECTORY);

fs.access(mainDir, function (error) {
  if (error) {
    fs.mkdirSync(mainDir, {
      recursive: true,
    });
  }
});

const currentDayFolder = path.join(mainDir, getTime());
fs.access(currentDayFolder, function (error) {
  if (error) {
    fs.mkdirSync(currentDayFolder, { recursive: true });
  }
});

const filePath = path.join(currentDayFolder, fileName);
module.exports = {
  systemLogger: createLogger({
    transports: new transports.File({
      filename: filePath,
      format: format.combine(
        format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
        format.label({
          label: path.basename(require.main.filename),
        }),
        format.align(),
        format.printf(
          (info) => `${[info.timestamp]} [${info.level}]${info.message}`
        )
      ),
    }),
  }),
};

function getTime() {
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  var out = date + "-" + month + "-" + year;
  return out;
}
