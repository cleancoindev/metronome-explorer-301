'use strict'

const cors = require('cors')
const express = require('express')

function listen (config, logger, callback) {
  const app = express()
  app.use(cors())

  // Transaction
  app.get('/transactions/:hash', function (req, res) {
    const { hash } = req.params
    const { baseUrl, txPath } = config.explorer
    logger.verbose('Redirecting tx', hash)
    res.redirect(301, `${baseUrl}${txPath.replace(':hash', hash)}`)
  })

  // Address' balance
  app.get('/accounts/:address', function (req, res) {
    const { address } = req.params
    const { explorer, metTokenAddress } = config
    const { baseUrl, accountPath } = explorer
    const path = accountPath
      .replace(':contract', metTokenAddress)
      .replace(':address', address)
    logger.verbose('Redirecting address', address)
    res.redirect(301, `${baseUrl}${path}`)
  })

  // All other routes
  app.all('*', function (req, res) {
    logger.verbose('Redirecting path', req.path)
    res.redirect(config.explorer.baseUrl)
  })

  app.use(function logErrors (err, req, res, next) {
    logger.warn('Something went wrong!', err.message)
    next(err)
  })

  return app.listen(config.port, callback)
}

module.exports = {
  listen
}
