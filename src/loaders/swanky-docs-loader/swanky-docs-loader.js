'use strict';

const _ = require('lodash');
const queryString = require('querystring');
const builders = require('./../../builders');

module.exports = function() {

  const callback = this.async();

  const query = queryString.parse(this.query.replace(/^\?/, ''));

  const currentPage = _.find(this.options.swankyDocs.sections, {'key': query.key});

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
