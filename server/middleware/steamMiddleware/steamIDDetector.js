const axios = require('axios')
const ini = require('ini')
const fs = require('fs')
const configurator = require('../../config/configurator')
const { logger, config } = configurator()

var url = require('url')

function checkIfURLisValid(str) {
  var pattern = new RegExp(
    '((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)',
  ) // fragment locator
  return !!pattern.test(str)
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

module.exports = async function (req, res, next) {
  const urlOrSteamID = req.body.handle

  if (checkIfURLisValid(urlOrSteamID)) {
    var q = url.parse(urlOrSteamID, true)
    var arr = q.pathname.split('/')
    if (isNumeric(arr[2])) {
      req.steamID = arr[2]
      req.vanityURL = null
    } else {
      req.vanityURL = arr[2]
      req.steamID = null
    }
    next()
  } else if (!isNumeric(urlOrSteamID) && !checkIfURLisValid(urlOrSteamID)) {
    req.vanityURL = urlOrSteamID
    req.steamID = null
    next()
  } else if (isNumeric(urlOrSteamID)) {
    req.vanityURL = null
    req.steamID = urlOrSteamID
    next()
  }
}
