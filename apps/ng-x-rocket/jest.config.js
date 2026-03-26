// https://github.com/thymikee/jest-preset-angular#brief-explanation-of-config
module.exports = {
  preset: 'jest-preset-angular',
  roots: ['src'],
  coverageDirectory: 'reports',
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  moduleNameMapper: {
    '@ng-x-rocket/(.*)': '<rootDir>/src/app/$1',
    '@ng-x-rocket/core': ['<rootDir>/src/app/@ng-x-rocket/core'],
    '@ng-x-rocket/core/(.*)': ['<rootDir>/src/app/@ng-x-rocket/core/$1'],
    '@ng-x-rocket/shared': ['<rootDir>/src/app/@ng-x-rocket/shared'],
    '@ng-x-rocket/shared/(.*)': ['<rootDir>/src/app/@ng-x-rocket/shared/$1'],
    '@ng-x-rocket/env': '<rootDir>/src/environments/environment',
  },
  globals: {
    'ts-jest': {
      allowSyntheticDefaultImports: true,
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  // Do not ignore librairies such as ionic, ionic-native or bootstrap to transform them during unit testing.
  transformIgnorePatterns: ['node_modules/(?!(jest-test|@ng-bootstrap))'],
};
