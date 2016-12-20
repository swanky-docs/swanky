'use strict';

const preprocessCss = require('../preprocess-css');
const path = require('path');
const fs = require('fs');

describe('preprocessCss', () => {
  it('should exist', () => {
    expect(preprocessCss).toBeDefined();
  });

  it('should process stylus', () => {
    const stylesPath = path.join(__dirname, './../__mocks__/__fixtures__/css/styles.styl');
    const styles = fs.readFileSync(stylesPath, 'utf-8');

    expect(preprocessCss(styles, stylesPath)).toBeDefined();
  });
});
