const Promise = require('bluebird');

module.exports = () => {
  return new Promise((resolve) => resolve({compiledContent: 'compiled content'}));
};

