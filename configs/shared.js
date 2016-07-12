var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = ({
  plugins = [],
  prefixes = [],
  publicPath = '/',
  optimize = false,
  ...opts
}) => {
  return {
    entry: [
      ...prefixes,
      'babel-polyfill',
      path.join(__dirname, '../src/index')
    ],
    output: {
      path: path.join(__dirname, '../build'),
      filename: 'bundle.js',
      publicPath
    },
    plugins: [].concat(
      plugins,
      optimize ?  new webpack.optimize.UglifyJsPlugin({compress: {warnings:false}}) : [],
      new webpack.ProvidePlugin({
        'Promise': 'bluebird',
        'React': 'react',
        '_': 'lodash'
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': optimize ? '"production"' : '"development"'
        }
      }),
      new webpack.NoErrorsPlugin(),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, '../src/index.html'),
        filename: 'index.html'
      })
    ),
    module: {
      loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'react-hot!babel'
      }, {
        test: /\.css$/,
        loader: `style!css?modules${optimize ? '&minify' : ''}&localIdentName=[local]-[hash:base64:6]!postcss`
      }]
    },
    postcss: [
      require('autoprefixer')({ browsers: ['last 2 versions'] }),
      require('precss')
    ],
    resolve: {
      modules: [path.join(__dirname, '../src'), 'node_modules']
    },
    ...opts
  };
};
