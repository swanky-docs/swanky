const stylus = require('stylus');

module.exports = (css, filename) => {
  return stylus(css)
    .set('filename', filename)
    .render();
};
