'use strict';

function getKey(pageTitle, parentTitle) {
  let str = parentTitle ? parentTitle + '-' + pageTitle : pageTitle;

  const result = str.toLowerCase()
    .replace(/(<([^>]+)>)/ig, '') // remove html tags
    .replace(/^[0-9.-_]+/g, '') // remove leading numbers
    .replace(/&/g, 'and') // replace & with 'and'
    .replace(/[\s_-]+/g, '-') // swap any length of whitespace, underscore, hyphen characters with a single -
    .replace(/^-+|-+$/g, ''); // remove leading, trailing -

  return result;
}

module.exports = getKey;
