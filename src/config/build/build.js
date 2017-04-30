'use strict';

const DEFAULTS = require('../../constants.js');
const webpackProdConfig = require(DEFAULTS.PROD.WEBPACK_CONFIG);
const webpackBaseConfig = require(DEFAULTS.WEBPACK_BASE_CONFIG);

/**
 * Create production config for webpack
 * @param  {Object} swankyConfig  - The swanky.config.yml file configuration
 * @param  {Array} loaders - User extended webpack configuration
 * @return {Object} - Webpack configuration
 */
module.exports = (swankyConfig, loaders) => {

  let webpackConfig = webpackBaseConfig(webpackProdConfig, swankyConfig);

  // extend webpack config with any additional user specified loaders
  if (loaders) {
    webpackConfig.module.rules = webpackConfig.module.rules.concat(loaders);
  }

  return webpackConfig;
};
