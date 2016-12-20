'use strict';

const nunjucks = require('nunjucks');
const he = require('he');
const DEFAULTS = require('./../../../constants.js');
const getSnippet = require('./get-snippet');

// Configure nunjucks loader
// https://mozilla.github.io/nunjucks/api.html#configure
nunjucks.configure('/', DEFAULTS.NUNJUCKS_CONFIG);

/**
 * Render a snippet with code example
 * @param {Object} metadata - the site/page metadata
 * @param {Object} template (snippetCodeTemplate) - the template string to render
 * @returns {Function} - render function to be used inside template
 */
function renderSnippetCode(metadata, template) {
  return function() {
    return nunjucks.renderString(template, {
      styles: metadata.cssMap,
      template: getSnippet(arguments, metadata),
      encode: he.encode
    });
  };
};

module.exports = renderSnippetCode;
