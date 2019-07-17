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
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]'
        }
      }
    })
    return config
  }
}

module.exports = [withTM, withCSS, withPreact]
  .reduce((value, plugin) => plugin(value), options)
