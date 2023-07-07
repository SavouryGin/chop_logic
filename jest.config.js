module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^components(.*)$': '<rootDir>/src/components$1',
    '^store(.*)$': '<rootDir>/src/store$1',
    '^utils(.*)$': '<rootDir>/src/utils$1',
    '^pages(.*)$': '<rootDir>/src/pages$1',
    '^styles(.*)$': '<rootDir>/src/styles$1',
    '^assets(.*)$': '<rootDir>/src/assets$1',
    '^enums(.*)$': '<rootDir>/src/enums$1',
    '^types(.*)$': '<rootDir>/src/types$1',
    '^hooks(.*)$': '<rootDir>/src/hooks$1',
    '^errors(.*)$': '<rootDir>/src/errors$1',
    '^logic(.*)$': '<rootDir>/src/logic$1',
    '^router(.*)$': '<rootDir>/src/router$1',
    '^app(.*)$': '<rootDir>/src/app$1',
    '^__mocks__(.*)$': '<rootDir>/src/__mocks__$1',
    '\\.(css|scss)$': '<rootDir>/src/__mocks__/style-mock.js',
  },
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
    '\\.svg$': '<rootDir>/src/utils/testing/jest-svg-transformer.js',
  },
  setupFilesAfterEnv: ['<rootDir>/src/utils/testing/setup-tests.ts'],
};
