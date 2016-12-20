'use strict';

const Promise = require('bluebird');
const nunjucks = require('nunjucks');
const DEFAULTS = require('./../../../constants');

// Configure nunjucks loader
// https://mozilla.github.io/nunjucks/api.html#configure
nunjucks.configure('/', DEFAULTS.NUNJUCKS_CONFIG);

function compile(page) {
  return new Promise((resolve) => {

    const anchors = page.compiledContent.filter((item) => !!item.title);

    // Compile main page
    const data = {
      key: page.key,
      url: page.url,
      hasAnchors: anchors.length > 0,
      parentKey: page.parentKey,
      title: page.title,
      contentSrc: page.content,
      contents: page.compiledContent,
      meta: page.meta,
      styles: page.meta.cssMap
    };

    nunjucks.render(page.layoutSrc, data, (err, result) => {
      page.compiled = result;
      resolve(page.compiled);
    });
  });
};

module.exports = compile;
