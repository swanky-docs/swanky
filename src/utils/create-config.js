'use strict';

const path = require('path');
const DEFAULTS = require('./../constants.js');
const loadConfig = require('./load-config');
const generateCssMap = require('./generate-css-map');
const getSiteMetadata = require('./get-site-metadata');

/**
 * Create Swanky Docs configuration object to pass around
 * @param {string | undefined} swankyConfigFilePath - Path to the swanky config file
 * @returns {Object} - Configuration object containing "built" swanky config plus additional meta data, to be used by Webpack
 */
function createConfig(swankyConfigFilePath) {
  let configPath;
  let swankyConfig;

  if (swankyConfigFilePath && typeof swankyConfigFilePath === 'string') {
    configPath = path.join(process.cwd(), swankyConfigFilePath);
    swankyConfig = loadConfig(configPath);
  } else if (swankyConfigFilePath) {
    // Use the provided configuration object
    swankyConfig = swankyConfigFilePath;
  } else {
    // Just load the default config
    configPath = path.join(process.cwd(), DEFAULTS.SWANKY_CONFIG);
    swankyConfig = loadConfig(configPath);
  }

  // Setup initial site metadata
  swankyConfig.meta = getSiteMetadata(swankyConfig);
  swankyConfig.meta.cssScopedName = DEFAULTS.CSS_SCOPED_NAME;
  swankyConfig.meta.cssMap = generateCssMap(
    path.join(swankyConfig.meta.theme, DEFAULTS.CSS_THEME_FOLDER),
    DEFAULTS.CSS_THEME_ENTRY,
    DEFAULTS.CSS_SCOPED_NAME
  );
  swankyConfig.meta.production = process.env.NODE_ENV === DEFAULTS.PROD.LABEL;

  return swankyConfig;
}

module.exports = createConfig;
