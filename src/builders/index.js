'use strict';

const contentListBuilder = require('./content-list-builder');
const contentBuilder = require('./content-builder');
const pageBuilder = require('./page-builder');
const preprocessorBuilder = require('./preprocessor-builder');

var builders = {
  contentListBuilder: contentListBuilder,
  contentBuilder: contentBuilder,
  pageBuilder: pageBuilder,
  preprocessorBuilder: preprocessorBuilder
};

module.exports = builders;
