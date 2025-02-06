// Copyright 2025 the Apple authors.
// This project is governed under the Mozilla Public License, v2.0. View in the LICENSE file.

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
};
