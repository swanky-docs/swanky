'use strict';

const renderSnippet = require('./render-snippet');
const renderCodeSnippet = require('./render-code-snippet');
const getSnippet = require('./get-snippet');

const actions = {
  renderSnippet: renderSnippet,
  renderCodeSnippet: renderCodeSnippet,
  getSnippet: getSnippet
};

module.exports = actions;
