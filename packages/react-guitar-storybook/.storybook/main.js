module.exports = {
  stories: ['../**/*.stories.tsx'],
  addons: [
    '@storybook/preset-typescript',
    '@storybook/addon-knobs/register',
    '@storybook/addon-storysource/register'
  ],
  webpackFinal: config => {
    config.module.rules.push({
      test: /\.stories\.tsx?$/,
      loaders: [
        {
          loader: require.resolve('@storybook/source-loader'),
          options: { parser: 'typescript' }
        }
      ],
      enforce: 'pre'
    })

    return config
  }
}
