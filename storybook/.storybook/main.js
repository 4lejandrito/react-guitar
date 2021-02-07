module.exports = {
  stories: ['../**/*.stories.tsx'],
  addons: [
    '@storybook/addon-knobs',
    '@storybook/addon-storysource',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
}
