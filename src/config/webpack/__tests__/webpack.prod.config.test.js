'use strict';

const webpackProdConfig = require('./../webpack.prod.config');

describe('Webpack dev config', () => {
  it('should exist', () => {
    expect(webpackProdConfig.devtool).toBeDefined();
    expect(webpackProdConfig.plugins).toBeDefined();
  });
});
