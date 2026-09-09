module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEach: [],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|module\\.css)$': 'identity-obj-proxy',
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  collectCoverageFrom: [
    'src/components/**/*.jsx',
    '!src/components/**/*.test.js',
  ],
  coverageThreshold: {
    global: {
      lines: 70,
      branches: 70,
    },
  },
};
