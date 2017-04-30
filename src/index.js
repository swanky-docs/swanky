'use strict';

const build = require('./config/build/build');
const serve = require('./config/serve/serve');
const createConfig = require('./utils/create-config');

// Temporary hack to remove
// (node:5192) DeprecationWarning: loaderUtils.parseQuery() received a non-string value which can be problematic, see https://github.com/webpack/loader-utils/issues/56
// parseQuery() will be replaced with getOptions() in the next major version of loader-utils.
process.noDeprecation = true;

module.exports = {
  devServer: (options) => {
    const swankyConfigFilePath = options && options.configPath ? options.configPath : '';
    const loaders = options && options.loaders ? options.loaders : [];
    const isDebugMode = options && options.debug ? options.debug : false;

    return serve(createConfig(swankyConfigFilePath), loaders, isDebugMode);
  },
  build: (options) => {
    const swankyConfigFilePath = options && options.configPath ? options.configPath : '';
    const loaders = options && options.loaders ? options.loaders : [];

    return build(createConfig(swankyConfigFilePath), loaders);
  }
};
