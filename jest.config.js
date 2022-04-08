// jest.config.js
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/.next/",
    "<rootDir>/cypress/",
  ],
  moduleNameMapper: {
    "@components": "<rootDir>/src/components",
    "@config": "<rootDir>/src/config",
    "@utils": "<rootDir>/src/utils",
    "@hooks": "<rootDir>/src/hooks",
    "@modules": "<rootDir>/src/modules",
    "@lib": "<rootDir>/src/lib",
    "@types": "<rootDir>/src/types",
  },
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
