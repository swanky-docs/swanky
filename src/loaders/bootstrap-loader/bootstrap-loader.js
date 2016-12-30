'use strict';

const fs = require('fs-extra');
const loaderUtils = require('loader-utils');

module.exports = function() {
  this.cacheable();

  const query = loaderUtils.parseQuery(this.query);
  const files = fs.walkSync(query.src);

  const matches = files.filter((file) => {
    return file.match(/index.js$/);
  });

  const scripts = matches.map((match) => {
    return `require('${match.replace(process.cwd() + '/', '')}');`;
  });

  const modifiedSource = `'use strict'\nmodule.exports = (function() {
    ${scripts.join('\n')}
  })();`;


  this.callback(null, modifiedSource);
};