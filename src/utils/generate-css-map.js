'use strict';

const path = require('path');
const hook = require('css-modules-require-hook');
const preprocessCss = require('./preprocess-css');

/**
 * Configure css modules require hook
 * @param {string} cssFolderPath - location of css file
 * @param {string} cssFileName - the css file name
 * @param {string} cssScopedName - hash to use for scoping css class names
 * @return {object} - the css modules map object
 */
module.exports = (cssFolderPath, cssFileName, cssScopedName) => {
  hook({
    generateScopedName: cssScopedName,
    extensions: ['.styl'],
    rootDir: cssFolderPath, // This will alter the generated hash
    preprocessCss: preprocessCss
  });

  // Return cssMap of hashed class names
  return require(path.join(cssFolderPath, cssFileName));
};
