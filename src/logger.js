'use strict'

const winston = require('winston')

const supported = {
  Papertrail: {
    require () {
      require('winston-papertrail')
    },
    prop: 'host'
  }
}

Object.keys(supported).forEach(function (name) {
  try {
    supported[name].require(winston)
  } catch (err) {
    // Do nothing
  }
})

function createLogger (config) {
  const transports = Object.keys(config)
    .map(name =>
      config[name] &&
        (supported[name] && supported[name].prop
          ? config[name][supported[name].prop]
          : true
        ) &&
        new winston.transports[name](config[name])
    )
    .filter(transport => !!transport)

  return new winston.Logger({ transports })
}

module.exports = createLogger
