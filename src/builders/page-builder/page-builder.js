'use strict';

const compile = require('./actions/compile');

function PageBuilder() {
  this.build = function(page) {
    return compile(page);
  };
}

module.exports = PageBuilder;
