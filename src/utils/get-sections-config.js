'use strict';

const pageFactory = require('./../factories/page-factory');
const DEFAULTS = require('./../constants.js');

module.exports = (sections, siteMeta) => {
  const _sections = sections && sections.length ? sections : DEFAULTS.DEFAULT_SECTION;

  return _sections.map((item) => {
    const page = pageFactory(item, siteMeta, null);
    let section = [].concat(page);

    if (item.subSections) {

      // Flatten sub-section into an array
      section = item.subSections.reduce((acc, value) => {
        const page = pageFactory(value, siteMeta, item.title);

        return acc.concat(page);
      }, section);
    }

    return section;

  }).reduce((acc, value) => acc.concat(value));
};
