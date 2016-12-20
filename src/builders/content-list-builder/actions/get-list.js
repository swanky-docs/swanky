'use strict';

const Promise = require('bluebird');
const _ = require('lodash');
const contentFactory = require('./../../../factories/content-factory');

function getList(page) {
  return new Promise((resolve) => {
    page.fileDependencies = [];

    if (_.isArray(page.content)) {
      page.fileDependencies = page.content.reduce((acc, value) => {
        // Seal this as we don't want anything added that we don't know about
        const contentModel = Object.seal(contentFactory(value, value.title));

        return acc.concat(contentModel);
      }, []);
    } else {
      // Seal this as we don;'t want anything added that we don't know about
      const contentModel = Object.seal(contentFactory(page));

      page.fileDependencies = page.fileDependencies.concat(contentModel);
    }
    resolve(page);
  });
};

module.exports = getList;
