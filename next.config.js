const withTM = require('next-transpile-modules')
const withCSS = require('@zeit/next-css')
const withPreact = require('next-preactx-plugin')

const options = {
  transpileModules: ['jsdom', 'canvas']
}

module.exports = [withTM, withCSS, withPreact]
  .reduce((value, plugin) => plugin(value), options)
