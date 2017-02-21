'use strict';

const walkSync = require('klaw-sync');
const loaderUtils = require('loader-utils');

module.exports = function() {
  this.cacheable();

  const query = loaderUtils.getOptions(this);

  const files = walkSync(query.src);

  const matches = files.filter((file) => {
    return file.path.match(/index.js$/);
  });

  const scripts = matches.map((match) => {
    return `require('${match.path.replace(process.cwd() + '/', '')}');`;
  });

  const modifiedSource = `'use strict'\nmodule.exports = (function() {
    ${scripts.join('\n')}
  })();`;


  this.callback(null, modifiedSource);
};
