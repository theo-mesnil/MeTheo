const commonPlugins = [
  [
    require.resolve('babel-plugin-module-resolver'),
    {
      extensions: ['.tsx', '.ts', '.js', '.json'],
      root: ['./src']
    }
  ]
];

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [...commonPlugins]
};
