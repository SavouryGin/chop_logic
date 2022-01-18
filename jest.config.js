module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^components(.*)$': '<rootDir>/src/components$1',
    '^store(.*)$': '<rootDir>/src/store$1',
    '^helpers(.*)$': '<rootDir>/src/helpers$1',
    '^pages(.*)$': '<rootDir>/src/pages$1',
    '^styles(.*)$': '<rootDir>/src/styles$1',
    '^assets(.*)$': '<rootDir>/src/assets$1',
    '^enums(.*)$': '<rootDir>/src/enums$1',
    '\\.(css|scss)$': '<rootDir>/src/__mocks__/styleMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/src/helpers/test-utils/setup-tests.ts'],
};
