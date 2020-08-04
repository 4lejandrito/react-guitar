module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globalSetup: 'react-screenshot-test/global-setup',
  globalTeardown: 'react-screenshot-test/global-teardown',
  testMatch: ['**/?(*.)+(screenshots).[jt]s?(x)'],
  transformIgnorePatterns: ['node_modules/.+\\.js']
}
