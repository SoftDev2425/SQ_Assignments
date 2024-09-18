/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
  verbose: true,
  forceExit: true,
  // clearMocks: true,
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup/setup.ts'],
  setupFiles: ['<rootDir>/src/tests/setup/setup-env.ts'],
  coveragePathIgnorePatterns: [
    'dist/',
    'firebase/',
    'mail/',
    'prisma/',
    'redis/',
  ],
}
