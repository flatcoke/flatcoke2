// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config()

const path = require('path')
const Dotenv = require('dotenv-webpack')
const withSass = require('@zeit/next-sass')

module.exports = withSass({
  cssModules: true,
  webpack: config => {
    config.plugins = config.plugins || [] // eslint-disable-line no-param-reassign
    // eslint-disable-next-line no-param-reassign
    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true,
      }),
    ]

    return config
  },
})
