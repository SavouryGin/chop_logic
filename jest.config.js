/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  // testRegex: '(/__tests__/.*|(\\.|/).*spec)\\.tsx$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^components(.*)$': '<rootDir>/src/components$1',
    '^store(.*)$': '<rootDir>/src/store$1',
    '^helpers(.*)$': '<rootDir>/src/helpers$1',
    '^constants(.*)$': '<rootDir>/src/constants$1',
    '^pages(.*)$': '<rootDir>/src/pages$1',
    '^styles(.*)$': '<rootDir>/src/styles$1',
    '^assets(.*)$': '<rootDir>/src/assets$1',
    '\\.(css|scss)$': '<rootDir>/src/__mocks__/styleMock.js',
  },
};
