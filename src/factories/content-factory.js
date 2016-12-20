'use strict';

const glob = require('glob');
const path = require('path');
const basePath = process.cwd();
const getKey = require('./../utils/get-key');
const generateKey = require('./../utils/generate-key');
const isExternal = require('./../utils/is-external');
const DEFAULTS = require('./../constants.js');

/**
 * Content Factory
 * @param {object} item - processed content item
 * @param {string} title - title of content
 * @return {object} - content object
 */
function contentFactory(item, title) {
  return {
    title: title,
    key: getKey(title || generateKey()),
    contentSrc: getFileList(item.content || item.src),
    preprocessor: item.preprocessor,
    processedContent: [],
    compiledContent: [],
    type: DEFAULTS.TYPE.CONTENT
  };
}

const getFileList = (content) => {
  return isExternal(content) ? content.split() : glob.sync(path.join(basePath, content));
};

module.exports = contentFactory;
