const withTM = require('next-transpile-modules')
const withCSS = require('@zeit/next-css')
const withPreact = require('next-preactx-plugin')

const options = {
  transpileModules: ['jsdom', 'canvas'],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg/,
      use: [
        {
          loader: 'svg-react-loader'
        }
      ]
    })
    return config
  }
}

module.exports = [withTM, withCSS, withPreact]
  .reduce((value, plugin) => plugin(value), options)
