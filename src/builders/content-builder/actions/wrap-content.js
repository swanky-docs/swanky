'use strict';

const nunjucks = require('nunjucks');
const DEFAULTS = require('./../../../constants.js');

// Configure nunjucks loader
// https://mozilla.github.io/nunjucks/api.html#configure
nunjucks.configure('/', DEFAULTS.NUNJUCKS_CONFIG);

/**
 * Wrap content in specified wrapper template
 * @param {String} compiledContent -  rendered content to be wrapped
 * @param {Object} contentMeta - content metadata
 * @param {Object} page - current page being processed
 * @returns {String} - rendered template
 */
function wrapContent(compiledContent, contentMeta, page) {
  return nunjucks.renderString(page.meta.contentWrapperTemplate, {
    title: contentMeta.title,
    hasParent: !!page.parentKey,
    hasPreprocessor: !!contentMeta.preprocessor,
    content: compiledContent,
    id: contentMeta.key,
    styles: page.meta.cssMap
  });
};

module.exports = wrapContent;
