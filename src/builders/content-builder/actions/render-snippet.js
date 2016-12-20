'use strict';

const nunjucks = require('nunjucks');
const DEFAULTS = require('./../../../constants.js');
const getSnippet = require('./get-snippet');

// Configure nunjucks loader
// https://mozilla.github.io/nunjucks/api.html#configure
nunjucks.configure('/', DEFAULTS.NUNJUCKS_CONFIG);

/**
 * Render a snippet example
 * @param {Object} metadata - the site/page metadata
 * @param {Object} template (snippetTemplate) - the template string to render
 * @returns {Function} - render function to be used inside template
 */
function renderSnippet(metadata, template) {
  return function() {
    return nunjucks.renderString(template, {
      styles: metadata.cssMap,
      template: getSnippet(arguments, metadata)
    });
  };
};

module.exports = renderSnippet;
