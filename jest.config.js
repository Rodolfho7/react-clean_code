module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts, tsx}',
    '!<rootDir>/src/main/**/*',
    '!**/*.d.ts'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest'
  },
  moduleNameMapper: {
    '\\.scss$': 'identity-obj-proxy'
  }
}
