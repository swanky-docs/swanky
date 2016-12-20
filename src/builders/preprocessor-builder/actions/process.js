'use strict';

const Promise = require('bluebird');

/**
 * Process the given pages content sources if required
 * @param {Object} page - entire page object
 * @returns {Promise} no return value
 */
function process(page) {
  return Promise.map(page.fileDependencies,
    (item) => {
      if (item.preprocessor) {
        const preprocessor = Object.keys(item.preprocessor)[0];
        const renderFn = require(preprocessor);

        // Require each preprocessor to compile item
        return renderFn(page, item).then((result) => {
          item.processedContent = result;
          return item.processedContent;
        });
      }
    }, { concurrency: 1 });
}

module.exports = process;
