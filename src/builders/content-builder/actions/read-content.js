'use strict';

const Promise = require('bluebird');
const fs = require('fs');
const DEFAULTS = require('./../../../constants.js');

/**
 * Read all content sources
 * @param {Object} page - the current page object to read content sources from
 * @returns {Object} - page content
 */
function readContent(page) {
  return Promise.map(page.fileDependencies,
    (item) => {
      // Only process the remaining content sources
      if (item.type === DEFAULTS.TYPE.CONTENT && !item.preprocessor) {
        item.contentSrc.forEach((src, index) => {
          item.processedContent[index] = fs.readFileSync(src, DEFAULTS.ENCODING.UTF8);
        });
      }
    }, { concurrency: 1 });
}

module.exports = readContent;
