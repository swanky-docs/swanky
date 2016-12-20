'use strict';

function getKey(pageTitle, parentTitle) {
  let str = parentTitle ? parentTitle + '-' + pageTitle : pageTitle;

  return str.toLowerCase()
    .replace(/(<([^>]+)>)/ig, '') // remove html tags
    .replace(/^[0-9.-_]+/g, '') // remove leading numbers
    .replace(/[\s_-]+/g, '-') // swap any length of whitespace, underscore, hyphen characters with a single -
    .replace(/^-+|-+$/g, ''); // remove leading, trailing -
}

module.exports = getKey;
