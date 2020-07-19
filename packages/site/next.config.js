const path = require('path')

const prod = process.env.NEXT_PUBLIC_URL.indexOf('localhost') === -1

module.exports = {
  assetPrefix: prod ? '/react-guitar/' : '',
  webpack(config, options) {
    const { isServer } = options
    config.module.rules.push({
      test: /\.(mp3)$/i,
      exclude: config.exclude,
      use: [
        {
          loader: require.resolve('url-loader'),
          options: {
            limit: config.inlineImageLimit,
            fallback: require.resolve('file-loader'),
            publicPath: `${config.assetPrefix}/_next/static/files/`,
            outputPath: `${isServer ? '../' : ''}static/files/`,
            name: '[name]-[hash].[ext]',
            esModule: config.esModule || false
          }
        }
      ]
    })

    return config
  }
}
