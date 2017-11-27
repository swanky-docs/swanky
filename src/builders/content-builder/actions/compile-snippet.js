'use strict';

const fs = require('fs-extra');
const walkSync = require('klaw-sync');
const path = require('path');
const nunjucks = require('nunjucks');
const DEFAULTS = require('./../../../constants.js');

// Configure nunjucks loader
// https://mozilla.github.io/nunjucks/api.html#configure
nunjucks.configure('/', DEFAULTS.NUNJUCKS_CONFIG);

/**
 * Read and render snippet template
 * @param {String} template - template string or path.
 * @param {Object} templateData - data used to compile template
 * @param {Object} siteMeta - site metadata
 * @returns {String} - the rendered template
 */
function compileSnippet(template, templateData, siteMeta) {
  const filePaths = fs.existsSync(siteMeta.snippets) ? walkSync(siteMeta.snippets) : [];
  let filePathIndex = -1;

  filePaths.forEach((val, index) => {
    const templatePath = path.join(template, 'template.html').replace(/\\/g, '\\\\'); // fix for windows paths
    const pattern = new RegExp(templatePath + '$');

    if (val.path.match(pattern)) {
      filePathIndex = index;
    }
  });

  if (filePathIndex > -1) {
    // Compile template if it exists
    return nunjucks.render(filePaths[filePathIndex].path, {
      styles: siteMeta.cssMap,
      data: templateData
    });
  } else {
    // Just return the template string
    // This could be a plain html string or the template may not exist
    return template;
  }
}

module.exports = compileSnippet;
