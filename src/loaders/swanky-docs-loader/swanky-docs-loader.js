'use strict';

const _ = require('lodash');
const querystring = require('querystring');
const builders = require('./../../builders');

module.exports = function() {

  this.cacheable();
  const callback = this.async();

  const config = querystring.parse(this.query.replace(/^\?/, ''));

  const options = JSON.parse(config.options);

  const currentPage = _.find(options.swankyDocs.sections, {'key': options.key});

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
