'use strict';

const build = require('./config/build/build');
const serve = require('./config/serve/serve');
const createConfig = require('./utils/create-config');

module.exports = {
  devServer: (options) => {
    const swankyConfigFilePath = options && options.configPath ? options.configPath : '';
    const webpackExtendConfig = options && options.webpackConfig ? options.webpackConfig : {};
    const isDebugMode = options && options.debug ? options.debug : false;

    return serve(createConfig(swankyConfigFilePath), webpackExtendConfig, isDebugMode);
  },
  build: (options) => {
    const swankyConfigFilePath = options && options.configPath ? options.configPath : '';
    const webpackExtendConfig = options && options.webpackConfig ? options.webpackConfig : {};

    return build(createConfig(swankyConfigFilePath), webpackExtendConfig);
  }
};
