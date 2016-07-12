const devConfig = require('../configs/client-dev.js');
const DevServer = require('webpack-dev-server');
const webpack = require('webpack');

export default () => {
  new DevServer(webpack(devConfig), {
    publicPath: '/',
    hot: true,
    stats: {
      colors: true,
      chunkModules: false
    }
  }).listen(8080, '0.0.0.0', () => {
    console.log('[webpack-dev-server]', 'Listening at port 8080');
  });
}
