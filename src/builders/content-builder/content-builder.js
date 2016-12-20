'use strict';

const addContent = require('./actions/add-content');
const getContent = require('./actions/read-content');

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
    return getContent(page)
      .then(() => addContent(page));
  };
}

module.exports = ContentBuilder;
