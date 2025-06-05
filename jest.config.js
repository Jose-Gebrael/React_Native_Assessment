module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // optional setup file
  testMatch: ['**/__tests__/**/*.test.ts?(x)'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|@react-native' +
      '|@react-navigation' +
      '|@react-native-community' +
      '|react-native-vector-icons' +
      // '|react-native-toast-message' +
      // '|react-native-image-picker' +
      // '|react-native-modal' +
      // '|react-native-animatable' +
      // '|react-native-swiper' +
      // '|react-native-maps' +
      ')/)',
  ],
};
