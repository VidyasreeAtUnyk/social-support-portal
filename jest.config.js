/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/components/$1',
    '^@services/(.*)$': '<rootDir>/services/$1',
    '^@hooks/(.*)$': '<rootDir>/hooks/$1',
    '^@lib/(.*)$': '<rootDir>/lib/$1',
    '^@store/(.*)$': '<rootDir>/store/$1',
    '^@providers/(.*)$': '<rootDir>/providers/$1',
    '^@content/(.*)$': '<rootDir>/content/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 20,
      functions: 20,
      lines: 20,
      statements: 20,
    },
  },
};
