const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

const folders = ['components', 'services', 'assets', 'store', 'screens', 'constants', 'store', 'services', 'navigation', 'utils', 'types'];

const alias = folders.reduce((acc, folder) => {
  acc[folder] = path.resolve(__dirname, `src/${folder}`);
  return acc;
}, {});

const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: ['db', 'mp4', 'png', 'jpg', 'jpeg'],
    sourceExts: ['js', 'jsx', 'ts', 'tsx', 'json', 'cjs', 'svg'],
    alias,
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
