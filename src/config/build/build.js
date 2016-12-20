'use strict';

const _ = require('lodash');
const DEFAULTS = require('../../constants.js');
const webpackProdConfig = require(DEFAULTS.PROD.WEBPACK_CONFIG);
const webpackBaseConfig = require(DEFAULTS.WEBPACK_BASE_CONFIG);

/**
 * Create production config for webpack
 * @param  {Object} swankyConfig  - The swanky.config.yml file configuration
 * @param  {Object} webpackExtendConfig - User extended webpack configuration
 * @return {Object} - Webpack configuration
 */
module.exports = (swankyConfig, webpackExtendConfig) => {

  let webpackConfig = webpackBaseConfig(webpackProdConfig, swankyConfig);

  if (webpackExtendConfig) {
    webpackConfig = _.merge(webpackConfig, webpackExtendConfig);
  }

  return webpackConfig;
};