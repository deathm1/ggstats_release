const fs = require('fs')
const path = require('path')
const ini = require('ini')

const config = ini.parse(
  fs.readFileSync(path.join(__dirname, './config.ini'), 'utf-8'),
)

if (parseInt(process.env.SERVER_STORAGE) == 1) {
  const logger = require('./logger')
  module.exports = function () {
    return { config, logger }
  }
} else {
  module.exports = function () {
    const logger = undefined
    return { config, logger }
  }
}
