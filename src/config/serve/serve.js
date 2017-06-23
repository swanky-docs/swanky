'use strict';

let browserSync = require('browser-sync');  // Allow this dependency to be overwritten with rewire()
const path = require('path');
const webpack = require('webpack');
const greet = require('./actions/greet');
const webpackDevMiddleware = require('webpack-dev-middleware');
const DEFAULTS = require('../../constants.js');

/**
 * Create dev config for webpackConfig
 * @param  {Object} swankyConfig - The swanky.config.yml file configuration
 * @param  {Object} loaders - User extended webpack loaders configuration
 * @param {Boolean} isDebugMode - display debugging logs
 * @param {Function} [webpackConfigMutatorFn=identity function] - hook to allow users to mutate the Webpack config
 * @return {Object} result - browserSync config Object
 */
module.exports = (swankyConfig, loaders, isDebugMode, webpackConfigMutatorFn = (x) => x) => {

  if (process.env.NODE_ENV !== 'test') {
    greet();
  }

  const webpackDevConfig = require(DEFAULTS.DEV.WEBPACK_CONFIG);
  let webpackConfig = require(DEFAULTS.WEBPACK_BASE_CONFIG)(webpackDevConfig, swankyConfig);

  // extend webpack config with any additional user specified loaders
  if (loaders && webpackConfig.module) {
    webpackConfig.module.rules = webpackConfig.module.rules.concat(loaders);
  }

  webpackConfig = webpackConfigMutatorFn(webpackConfig);

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
        webpackDevMiddleware(bundler, webpackDevMiddlewareConfig)
      ]
    },
    // Files to watch
    files: [
      path.join(swankyConfig.meta.src, '/**/*.css'),
      path.join(swankyConfig.meta.src, '/**/*.js'),
      path.join(swankyConfig.meta.src, '/**/*.jsx'),
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
