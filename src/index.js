'use strict'

const cors = require('cors')
const express = require('express')

function listen (config, logger, callback) {
  const app = express()
  app.use(cors())

  app.get('/transactions/:hash', function (req, res) {
    const { hash } = req.params
    const { baseUrl, path } = config.explorer
    logger.verbose('Redirecting tx', hash)
    res.redirect(301, `${baseUrl}${path.replace(':hash', hash)}`)
  })
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
