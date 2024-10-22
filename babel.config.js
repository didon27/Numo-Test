module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.android.js',
          '.android.tsx',
          '.ios.js',
          '.ios.tsx',
        ],
        alias: {
          constants: './src/constants',
          screens: './src/screens',
          assets: './src/assets',
          components: './src/components',
          store: './src/store',
          navigation: './src/navigation',
          utils: './src/utils',
          services: './src/services',
          types: './src/types',
        },
      },
    ],
    ['@babel/plugin-transform-private-methods', { loose: true }], // Установите режим "loose"
    ['@babel/plugin-transform-class-properties', { loose: true }], // Убедитесь, что он также включен
    ['@babel/plugin-transform-private-property-in-object', { loose: true }], // И этот плагин
  ],
};
