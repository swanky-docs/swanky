'use strict';

const Promise = require('bluebird');
const addContent = require('./actions/add-content');
const readContent = require('./actions/read-content');

/**
 * Compile page content
 * @constructor
 */
function ContentBuilder() {
  /**
   * Build orchestration
   * @param {Object} page - page object to process
   * @returns {Promise} - modified page object
   */
  this.build = function(page) {
    return Promise.map(page.fileDependencies, (item) => readContent(item))
      .then(() => addContent(page));
  };
}

module.exports = ContentBuilder;
