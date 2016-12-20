'use strict';

const _ = require('lodash');
const path = require('path');
const basePath = process.cwd();
const getKey = require('./../utils/get-key');

/**
 * Page Factory
 * @param {Object} page - page configuration
 * @param {Object} meta - site meta data
 * @param {String} parent - parent title
 * @return {object} - page object
 */
function pageFactory(page, meta, parent) {
  return {
    meta: meta,
    key: getKey(page.title, parent),
    parentKey: getParentKey(parent),
    title: page.title,
    filename: getFileName(page.title),
    url: getUrl(page.title, parent),
    content: page.content,
    layoutSrc: getLayout(page.layout, meta.layouts),
    preprocessor: page.preprocessor,
    bootstrap: getBootstrapScripts(page.bootstrap)
  };
}

const getUrl = (title, parent) => {
  return parent ? `${getParentKey(parent)}/${getFileName(title)}` : getFileName(title);
};

const getFileName = (title) => {
  return _.kebabCase(title) + '.html';
};

const getLayout = (layout, themeLayoutPath) => {
  return layout ? path.join(themeLayoutPath, layout) : path.join(themeLayoutPath, 'default.html');
};

const getParentKey = (parent) => {
  return parent ? getKey(parent) : null;
};

const getBootstrapScripts = (bootstrapConfig) => {
  if (bootstrapConfig) {
    return bootstrapConfig.map((item) => {
      return path.join(basePath, item);
    });
  } else {
    return [];
  }
};

module.exports = pageFactory;
