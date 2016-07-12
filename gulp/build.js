const prodConfig = require('../configs/client-prod.js');
const webpack = require('webpack');
const rimraf = require('rimraf');
const { promisify } = require('bluebird');
const path = require('path');
const argv = require('yargs').argv;
const VisualizerPlugin = require('webpack-visualizer-plugin');

export default async () => {
  await promisify(rimraf)(path.join(__dirname, '../build'));
  const config = {
    ...prodConfig,
    plugins: [].concat(
      prodConfig.plugins,
      argv.visualizer ? new VisualizerPlugin() : [],
    )
  };
  await promisify(webpack)(prodConfig).then((stats) => {
    console.log('[webpack]', stats.toString({
      colors: true,
      errorDetails: true,
      chunkModules: false
    }));
  });
};
