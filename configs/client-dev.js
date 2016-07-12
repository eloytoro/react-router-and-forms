const webpack = require('webpack');
const VisualizerPlugin = require('webpack-visualizer-plugin');
const createConfig = require('./shared');

module.exports = createConfig({
  devtool: 'eval',
  prefixes: [
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server'
  ],
  plugins: [
    new VisualizerPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});
