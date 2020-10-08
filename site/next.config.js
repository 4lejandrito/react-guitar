module.exports = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})({
  webpack(config, options) {
    const { isServer } = options
    config.module.rules.push({
      test: /\.(mp3)$/i,
      exclude: config.exclude,
      use: [
        {
          loader: require.resolve('url-loader'),
          options: {
            limit: 0,
            fallback: require.resolve('file-loader'),
            publicPath: `${config.assetPrefix || ''}/_next/static/files/`,
            outputPath: `${isServer ? '../' : ''}static/files/`,
            name: '[name]-[hash].[ext]',
            esModule: config.esModule || false
          }
        }
      ]
    })

    return config
  }
})
