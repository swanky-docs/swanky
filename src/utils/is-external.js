'use strict';

const EXTERNAL_URL_PATTERN = /^https?:\/\//i;

function isExternal(path) {
  return EXTERNAL_URL_PATTERN.test(path);
}

module.exports = isExternal;
