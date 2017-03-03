const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = function (isDebug) {
  const plugins = [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `'${process.env.NODE_ENV || 'development'}'`
      },
      IS_PRODUCTION: !isDebug,
      IS_DEVELOPMENT: isDebug
    })
  ];

  const clientEntry = ['./src/client/client.js'];
  let publicPath = '/build/';

  if (isDebug) {
    plugins.push(new webpack.HotModuleReplacementPlugin());

    clientEntry.unshift(
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8080/',
        'webpack/hot/only-dev-server');

    publicPath = 'http://localhost:8080/build/';
  } else {
    plugins.push(
        new ExtractTextPlugin({filename: '[name].css'}),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false,
            screw_ie8: true,
            conditionals: true,
            unused: true,
            comparisons: true,
            sequences: true,
            dead_code: true,
            evaluate: true,
            if_return: true,
            join_vars: true,
          },
          output: {
            comments: false,
          }
        })
    );
  }

  return {
    name: 'client',
    devtool: isDebug ? 'eval-source-map' : 'source-map',
    entry: {
      app: clientEntry,
      vendor: ['react', 'react-dom']
    },
    output: {
      path: path.join(__dirname, 'public', 'build'),
      filename: '[name].js',
      publicPath
    },
    resolve: {
      extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
      alias: {
        shared: path.join(__dirname, 'src', 'server', 'shared')
      }
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: 'eslint-loader'
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
              {
                loader: "css-loader",
                options: {
                  sourceMap: true
                }
              }
            ]
          })
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: "css-loader",
                options: {
                  sourceMap: true
                }
              },
              {
                loader: "sass-loader",
                options: {
                  sourceMap: true
                }
              },
            ]
          })
        },
        {
          test: /test:\.(png|jpg|jpeg|gif|woff|ttf|eot|svg|woff2)/,
          loader: 'url-loader',
          options: {
            limit: 5000,
          }
        }
      ]
    },
    plugins
  };
};
