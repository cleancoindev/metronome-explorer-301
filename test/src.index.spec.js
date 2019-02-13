'use strict'

const chai = require('chai')
const got = require('got')
const randomstring = require('randomstring').generate

const { listen } = require('../src')

chai.should()

const randomHex = length => `0x${randomstring({ length, charset: 'hex' })}`
const randomAddr = () => randomHex(40)
const randomTxId = () => randomHex(64)

const port = 3004
const testConfig = {
  explorer: {
    accountPath: '/tokens/:contract/balances/:address',
    baseUrl: 'http://test-explorer',
    txPath: '/txs/:hash'
  },
  metTokenAddress: randomAddr(),
  port
}
const testLogger = {
  verbose: console.log,
  warn: console.warn
}

describe('Redirector', function () {
  let server

  before(function (done) {
    server = listen(testConfig, testLogger, done)
  })

  it('should redirect tx requests', function () {
    const hash = randomTxId()
    return got(`http://localhost:${port}/transactions/${hash}`, {
      followRedirect: false
    })
      .then(function (response) {
        const { baseUrl, txPath } = testConfig.explorer
        const redirectUrl = `${baseUrl}${txPath.replace(':hash', hash)}`
        response.headers.location.should.equal(redirectUrl)
        response.statusCode.should.equal(301)
      })
  })

  it('should redirect accounts requests', function () {
    const address = randomAddr()
    return got(`http://localhost:${port}/accounts/${address}`, {
      followRedirect: false
    })
      .then(function (response) {
        const { explorer: { baseUrl, accountPath }, metTokenAddress } = testConfig
        const path = accountPath
          .replace(':contract', metTokenAddress)
          .replace(':address', address)
        const redirectUrl = `${baseUrl}${path}`
        response.headers.location.should.equal(redirectUrl)
        response.statusCode.should.equal(301)
      })
  })

  it('should redirect all other requests too', function () {
    const path = randomstring()
    return got(`http://localhost:${port}/${path}`, {
      followRedirect: false
    })
      .then(function (response) {
        response.headers.location.should.equal(testConfig.explorer.baseUrl)
        response.statusCode.should.equal(302)
      })
  })

  after(function (done) {
    server.close(done)
  })
})
