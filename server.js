'use strict'

const beforeExit = require('before-exit')
const config = require('config')
const pDefer = require('p-defer')

const createLogger = require('./src/logger')
const server = require('./src')

const logger = createLogger(config.logger)
logger.debug('Starting with config', config)

server.listen(config, logger, function () {
  logger.info('Listening on port %s', config.port)
})

beforeExit.do(function (signal) {
  const deferred = pDefer()
  logger.error('Shutting down on', signal, function (err) {
    deferred[err ? 'reject' : 'resolve'](err)
  })
  return deferred.promise
})
