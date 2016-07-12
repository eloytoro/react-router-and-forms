const webpack = require('webpack');
const VisualizerPlugin = require('webpack-visualizer-plugin');
const createConfig = require('./shared');

module.exports = createConfig({
  devtool: 'eval',
  prefixes: [
    'webpack/hot/only-dev-server'
  ],
  plugins: [
    new VisualizerPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});
