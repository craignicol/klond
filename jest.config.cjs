module.exports = {
  preset: 'ts-jest/presets/default-esm',
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts$': ['ts-jest', {
      useESM: true,
      tsconfig: 'tsconfig.test.json',
    }],
    '^.+\\.svelte$': [
      'svelte-jester',
      {
        preprocess: true,
      },
    ],
  },
  coverageDirectory: '<rootDir>/coverage',
  testEnvironment: 'jsdom',
  collectCoverageFrom: ['<rootDir>/src/**/*.{js,ts}', '!**/node_modules/**'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'svelte'],
};
