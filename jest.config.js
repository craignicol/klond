module.exports = {
  preset: 'ts-jest/presets/default-esm',
  globals: {
    'ts-jest': {
      useESM: true,
    }
  },
  moduleNameMapper: {   '^(\\.{1,2}/.*)\\.js$': '$1',},
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
    "^.+\\.svelte$": ["svelte-jester", { preprocess: true }]
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
