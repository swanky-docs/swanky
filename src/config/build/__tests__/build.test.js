'use strict';

const buildConfig = require('./../build');
const swankyConfig = {};
const extendedConfig = { extended: 'config' };

// We don't care about the actual config here
jest.mock('./../../webpack/webpack.config');
const webpackConfig = require('./../../webpack/webpack.config');

webpackConfig.mockImplementation(() => {
  return {};
});

describe('buildConfig', () => {
  it('should exist', () => {
    expect(buildConfig).toBeDefined();
  });

  it('should create a production webpack config', () => {
    expect(buildConfig(swankyConfig)).toEqual({});
  });

  it('should allow extended configuration', () => {
    expect(buildConfig(swankyConfig, extendedConfig)).toEqual(extendedConfig);
  });
});