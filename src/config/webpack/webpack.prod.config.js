'use strict';

const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: false,
      __PROD__: true
    })
  ]
};
