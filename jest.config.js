module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testMatch: ['<rootDir>/test/*.{js,jsx,ts,tsx}'],
  coveragePathIgnorePatterns: ['/node_modules/', 'dist/', 'index.ts'],
  moduleNameMapper: {
    '\\.s?css$': 'identity-obj-proxy',
  },
  testEnvironment: 'jsdom',
};
