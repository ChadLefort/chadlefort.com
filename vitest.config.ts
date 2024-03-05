import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    root: './',
    include: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setup-test-env.ts'],
    exclude: ['node_modules', '.cache', './public']
  }
});
// rootDir: './',
// testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
// transform: {
//   '^.+\\.[jt]sx?$': '<rootDir>/jest-preprocess.js'
// },
// moduleNameMapper: {
//   '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
//   '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/file-mock.js'
// },
// testPathIgnorePatterns: ['node_modules', '.cache', '<rootDir>.*/public'],
// globals: {
//   __PATH_PREFIX__: ''
// },
// setupFiles: ['<rootDir>/loadershim.js'],
// setupFilesAfterEnv: ['<rootDir>/setup-test-env.js'],
// testEnvironment: 'jsdom'
