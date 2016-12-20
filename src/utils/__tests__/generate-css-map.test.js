'use strict';

const path = require('path');
const generateCssMap = require('../generate-css-map');
const DEFAULTS = require('./../../constants');

jest.mock('css-modules-require-hook');
jest.mock('./../preprocess-css');

describe('generateCssMap', () => {
  it('should exist', () => {
    expect(generateCssMap).toBeDefined();
  });

  it('should return a css map object', () => {
    const cssFolderPath = path.join(__dirname, './../__mocks__/__fixtures__/css');
    const cssFileName = 'styles.styl';
    const cssScopedName = DEFAULTS.CSS_SCOPED_NAME;

    expect(generateCssMap(cssFolderPath, cssFileName, cssScopedName)).toEqual({});
  });
});
