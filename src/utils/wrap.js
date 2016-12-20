'use strict';

const wrapGroupRegex = /\[(wrap)(?:\s)?(class="[^"]+")?](?:\s*)([\s\S]*?)(?:\s*)\[\/\1]/gi;
const showdown = require('showdown');
const markdown = new showdown.Converter();

let wrap = () => {
  return [{
    type: 'lang',
    filter: (text) => {
      return text.replace(wrapGroupRegex, (match, type, classes, content) => {
        return `<div${classes ? ' ' + classes : ''}>${markdown.makeHtml(content)}</div>`;
      });
    }
  }];
};

module.exports = wrap;
