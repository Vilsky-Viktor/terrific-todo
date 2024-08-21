export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  coveragePathIgnorePatterns: [
    "<rootDir>/src/dataAccess/",
    "<rootDir>/src/routes/",
    "<rootDir>/src/config/",
  ],
};