/**
 * Created Date: 2018/3/1
 * Author: luojinghui
 */
var path = require('path');

module.exports = {
  entry: './src/ldialog.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'ldialog.min.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: [
            require.resolve('babel-preset-es2015')
          ]
        }
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          {loader: 'css-loader', options: {importLoaders: 1}},
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  },
  watch: true
};