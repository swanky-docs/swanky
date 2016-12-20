'use strict';

const build = require('./config/build/build');
const serve = require('./config/serve/serve');
const createConfig = require('./utils/create-config');

module.exports = {
  devServer: (swankyConfigFilePath, webpackExtendConfig) => {
    return serve(createConfig(swankyConfigFilePath), webpackExtendConfig);
  },
  buildConfig: (swankyConfigFilePath, webpackExtendConfig) => {
    return build(createConfig(swankyConfigFilePath), webpackExtendConfig);
  }
};
