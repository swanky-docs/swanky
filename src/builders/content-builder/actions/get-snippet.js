'use strict';

const compileSnippet = require('./compile-snippet');

function getSnippet(args, metadata) {
  let template;

  // Handle array of snippets
  if (args[0].constructor === Array) {

    let templateArr = args[0].map((item) => {
      return compileSnippet(item.template, item.data, metadata);
    });

    template = templateArr.join('\n\n');

  } else {

    // Handle individual snippet
    let templateStr = args[0];
    let templateData = args[1] || {};

    template = compileSnippet(templateStr, templateData, metadata);
  }

  return template;
}

module.exports = getSnippet;