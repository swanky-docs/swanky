'use strict';

const process = require('./actions/process');

/**
 * Preprocessor Builder
 * @constructor
 */
function PreprocessorBuilder() {
  this.build = function(page) {
    return process(page);
  };
}

module.exports = PreprocessorBuilder;
