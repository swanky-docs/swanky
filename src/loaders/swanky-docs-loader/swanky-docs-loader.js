'use strict';

const _ = require('lodash');
const loaderUtils = require('loader-utils');
const builders = require('./../../builders');

module.exports = function() {

  this.cacheable();
  const callback = this.async();

  const swankyDocsLoaderConfig = loaderUtils.getLoaderConfig(this, 'swankyDocsLoader');
  const swankyDocsConfig = loaderUtils.getLoaderConfig(this, 'swankyDocs');
  const currentPage = _.find(swankyDocsConfig.sections, {'key': swankyDocsLoaderConfig.key});

  // Add theme file dependencies
  currentPage.meta.fileDependencies.forEach((dep) => {
    this.addDependency(dep);
  });

  builders.contentListBuilder.build(currentPage)
    .then(() => builders.preprocessorBuilder.build(currentPage))
    .then(() => builders.contentBuilder.build(currentPage))
    .then(() => builders.pageBuilder.build(currentPage))
    .finally(() => {

      // Add content dependencies
      currentPage.fileDependencies.forEach((dependencies) => {
        dependencies.contentSrc.forEach((dep) => {
          this.addDependency(dep);
        });
      });

      callback(null, currentPage.compiled);
    });
};