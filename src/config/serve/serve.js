'use strict';

let browserSync = require('browser-sync');  // Allow this dependency to be overwritten with rewire()
const path = require('path');
const _ = require('lodash');
const webpack = require('webpack');
const greet = require('./actions/greet');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const DEFAULTS = require('../../constants.js');

/**
 * Create dev config for webpackConfig
 * @param  {Object} swankyConfig - The swanky.config.yml file configuration
 * @param  {Object} webpackExtendConfig - User extended webpack configuration
 * @param {Boolean} isDebugMode - display debugging logs
 * @return {Object} result - browserSync config Object
 */
module.exports = (swankyConfig, webpackExtendConfig, isDebugMode) => {

  if (process.env.NODE_ENV !== 'test') {
    greet();
  }

  const webpackDevConfig = require(DEFAULTS.DEV.WEBPACK_CONFIG);
  const webpackConfig = require(DEFAULTS.WEBPACK_BASE_CONFIG)(webpackDevConfig, swankyConfig);

  if (webpackExtendConfig) {
    _.merge(webpackConfig, webpackExtendConfig);
  }

  const bundler = webpack(webpackConfig);
  let webpackDevMiddlewareConfig = {};

  if (isDebugMode) {
    webpackDevMiddlewareConfig = {
      publicPath: webpackConfig.output.publicPath,
      stats: {
        colors: true
      }
    };
  } else {
    webpackDevMiddlewareConfig = {
      publicPath: webpackConfig.output.publicPath,
      quiet: true,
      noInfo: false,
      stats: 'errors-only'
    };
  }

  let result = browserSync({
    open: !isDebugMode, // do not open if in debug mode
    logLevel: 'info',
    logPrefix: 'Swanky Server',
    notify: false,
    server: {
      baseDir: '/',
      middleware: [
        webpackDevMiddleware(bundler, webpackDevMiddlewareConfig),
        webpackHotMiddleware(bundler, { log: false })
      ]
    },
    // Files to watch
    files: [
      path.join(swankyConfig.meta.src, '/**/*.css'),
      path.join(swankyConfig.meta.src, '/**/*.js'),
      path.join(swankyConfig.meta.src, '/**/*.styl'),
      path.join(swankyConfig.meta.src, '/**/*.less'),
      path.join(swankyConfig.meta.src, '/**/*.scss'),
      path.join(swankyConfig.meta.src, '/**/*.ejs'),
      path.join(swankyConfig.meta.src, '/**/*.html'),
      path.join(swankyConfig.meta.src, '/**/*.md')
    ]
  });

  return result;
};
