'use strict';

const Promise = require('bluebird');
const path = require('path');
const wrapContent = require('./wrap-content');
const compileContent = require('./compile-content');
const DEFAULTS = require('./../../../constants.js');

/**
 * Create a content object from all content sources
 * @param {Object} page - the current page object to read content sources from
 * @returns {Promise} - compiled page content
 */
function addContent(page) {
  return new Promise((resolve) => {
    page.compiledContent = page.fileDependencies
      // We only want fileDependencies that are of type 'content'
      .filter((item) => item.type === DEFAULTS.TYPE.CONTENT)
      .reduce((acc, item) => {
        item.compiledContent = item.processedContent.map((content, index) => {
          let fileExtension = path.extname(item.contentSrc[index]);

          return {
            key: item.key,
            title: item.title,
            content: wrapContent(
              compileContent(page, { content: content }, fileExtension),
              item,
              page
            )
          };
        });

        return acc.concat(item.compiledContent);

      }, []);

    resolve(page.compiledContent);
  });
};

module.exports = addContent;
