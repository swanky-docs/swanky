'use strict';

const getList = require('./actions/get-list');

function ContentListBuilder() {
  this.build = function(page) {
    return getList(page);
  };
}

module.exports = ContentListBuilder;
