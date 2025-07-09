export default {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  setupFiles: ['./util/text-encoder-polyfill.js', './util/intersection-observer-polyfill.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(@sanity|vite)/)',
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/main.jsx',
    '!src/vite-env.d.ts',
    '!src/**/*.test.{js,jsx}',
    '!src/**/__tests__/**',
  ],
  coverageReporters: ['text', 'lcov', 'html'],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  globals: {
    'import.meta': {
      env: {
        VITE_SANITY_PROJECT_ID: 'oqst5cr0',
        VITE_SANITY_DATASET: 'production',
        VITE_SANITY_API_TOKEN: 'test-token',
      },
    },
  },
}; 