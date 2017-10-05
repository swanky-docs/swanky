'use strict';

const pageFactory = require('./../factories/page-factory');
const DEFAULTS = require('./../constants.js');

const recursivelyAddSubSections = (section, item, siteMeta, root) => {
  if (item.subSections) {
    item.subSections.forEach((subsection) => {
      const page = pageFactory(subsection, siteMeta, root.title);

      section.push(page);
      recursivelyAddSubSections(section, subsection, siteMeta, root);
    });
  }
};

module.exports = (sections, siteMeta) => {
  const _sections = sections && sections.length ? sections : DEFAULTS.DEFAULT_SECTION;

  return _sections.map((item) => {
    const page = pageFactory(item, siteMeta, null);
    let section = [].concat(page);

    recursivelyAddSubSections(section, item,  siteMeta, page);

    return section;

  }).reduce((acc, value) => acc.concat(value));
};
