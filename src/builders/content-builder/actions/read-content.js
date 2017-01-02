'use strict';

const Promise = require('bluebird');
const fs = require('fs');
const request = require('request');
const readFile = Promise.promisify(fs.readFile);
const DEFAULTS = require('./../../../constants.js');
const isExternal = require('./../../../utils/is-external.js');

/**
 * Read all content sources
 * @param {Object} item - the current content object to read content sources from
 * @returns {Object} - processed content
 */
function readContent(item) {
  return Promise.map(item.contentSrc, (src) => {
    // Only process the remaining content sources
    if (item.type === DEFAULTS.TYPE.CONTENT && !item.preprocessor) {
      if (isExternal(src)) {
        return readExternalContent(src).then((content) => {
          item.processedContent.push(content);
        });
      } else {
        return readInternalContent(src).then((content) => {
          item.processedContent.push(content);
        });
      }
    }
  }).catch((err) => {
    console.log('» swanky . ', err);
  });
}

function readInternalContent(src) {
  return readFile(src, DEFAULTS.ENCODING.UTF8);
}

function readExternalContent(src) {
  return new Promise((resolve, reject) => {
    request(src, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve(body);
      }

      reject('Error reading external url ( ' + src + ' ). Please check url and try again.');
    });
  });
}

module.exports = readContent;
