// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */

module.exports = {
  verbose: true,
  coverageDirectory: './coverage/',
  collectCoverage: true,
  transformIgnorePatterns: [
    'node_modules/(?!@patternfly|@data-driven-forms)',

    // Uncomment the below line if you face any errors with jest
    // '/node_modules/(?!@redhat-cloud-services)',
  ],
  collectCoverageFrom: [
    '<rootDir>/packages/**/src/**/*.js',
    '!<rootDir>/packages/**/stories/*',
    '!<rootDir>/packages/**/index.js',
    '!<rootDir>/packages/**/*{c|C}ontext*.js',
    '!<rootDir>/packages/components/src/Components/Table/*',
  ],
  setupFilesAfterEnv: [ '<rootDir>/config/setupTests.js', 'jest-canvas-mock' ],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost:5000/',
  },
  setupFiles: [ './jest.setup.js' ],
  roots: [ '<rootDir>/packages/' ],
  // modulePathIgnorePatterns: ['<rootDir>/packages/create-crc-app/templates', '<rootDir>/packages/docs/.cache'],
  modulePathIgnorePatterns: [
    '<rootDir>/packages/*.*/dist/*.*',
    '<rootDir>/packages/*.*/public/*.*',
    '<rootDir>/packages/*.*/.cache/*.*'
  ],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '^lodash-es$': 'lodash',
    customReact: 'react',
    reactRedux: 'react-redux',
    PFReactCore: '@patternfly/react-core',
    PFReactTable: '@patternfly/react-table',
  },
  globalSetup: '<rootDir>/config/globalSetup.js',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': [ 'ts-jest', { tsconfig: './packages/module/tsconfig.json', } ],
  },
};
