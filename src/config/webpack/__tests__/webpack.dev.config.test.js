'use strict';

const webpackDevConfig = require('./../webpack.dev.config');

describe('Webpack dev config', () => {
  it('should exist', () => {
    expect(webpackDevConfig.devtool).toBeDefined();
    expect(webpackDevConfig.plugins).toBeDefined();
  });
});