'use strict';

const webpack = require('webpack');

module.exports = {
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: true,
      __PROD__: false
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
