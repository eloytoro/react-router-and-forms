const devConfig = require('../configs/client-dev.js');
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');


export default () => {
  const app = require('express')();
  const server = require('http').createServer(app);
  const io = require('socket.io')(server);

  const compiler = webpack(devConfig);

  app.use(webpackMiddleware(compiler, {
    publicPath: '/',
    stats: {
      colors: true,
      chunkModules: false
    }
  }));

  let state = {};

  io.on('connection', function (socket) {
    socket.emit('setState', state);
    socket.on('setState', function (data) {
      state = data;
      socket.broadcast.emit('setState', data);
    });
  });

  server.listen(8080, '0.0.0.0');

  console.log('[webpack-dev-server]', 'Listening at port 8080');
}
