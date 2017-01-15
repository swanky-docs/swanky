'use strict';

const nunjucks = require('nunjucks');
const renderSnippet = require('./render-snippet');
const renderCodeSnippet = require('./render-code-snippet');
const showdown = require('showdown');
const shortCode = require('./../../../utils/short-code');
const wrap = require('./../../../utils/wrap');
const classy = require('./../../../utils/classy');
const showdownHighlight = require('showdown-highlight');
const DEFAULTS = require('./../../../constants.js');

// Create github style header (spaces are replaced with dashes)
showdown.setFlavor('github');

// Configure showdown markdown extensions
const markdown = new showdown.Converter({
  extensions: [shortCode, wrap, showdownHighlight, classy],
  tables: true
});

// Configure nunjucks loader
// https://mozilla.github.io/nunjucks/api.html#configure
nunjucks.configure('/', DEFAULTS.NUNJUCKS_CONFIG);

/**
 * Do any additional content transformation
 * based on file extension
 * @param {Object} page - main page object
 * @param {Object} item - content item to compile
 * @param {String} fileExtension - extension type of content file
 * @returns {String} - rendered content string
 */
function compileContent(page, item, fileExtension) {
  var content;
  var render = renderSnippet(page.meta, page.meta.renderTemplate);
  var code = renderCodeSnippet(page.meta, page.meta.snippetTemplate);

  switch (fileExtension) {
  case DEFAULTS.EXTENSION.MARKDOWN:
    content = markdown.makeHtml(item.content);
    break;
  default:
    content = item.content;
  }

  // Always run templates through nunjucks engine
  // as code snippets may need to be rendered here
  return nunjucks.renderString(content, {
    render: render, // render snippet method
    code: code, // code preview method
    styles: page.meta.cssMap
  });
};

module.exports = compileContent;
