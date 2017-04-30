'use strict';

const serve = require('../serve');
const mockConfig = {
  meta: {
    title: 'Swanky Docs',
    repo: 'https://github.com',
    version: '0.0.0',
    src: 'docs',
    theme: 'docs/themes/test-theme',
    layouts: 'docs/themes/test-theme/templates/layouts',
    partials: 'docs/themes/test-theme/templates/partials',
    output: 'docs/build'
  },
  sections: []
};

jest.mock('webpack-hot-middleware', () => {
  return () => {
    return {};
  };
});

jest.mock('webpack-dev-middleware', () => {
  return () => {
    return {};
  };
});

jest.mock('./../../webpack/webpack.config');
const webpackConfig = require('./../../webpack/webpack.config');

webpackConfig.mockImplementation(() => {
  return {
    output: {
      publicPath: ''
    }
  };
});

jest.mock('webpack');
const webpack = require('webpack');

webpack.DefinePlugin = function() {};
webpack.HotModuleReplacementPlugin = function() {};

jest.mock('lodash');
const _ = require('lodash');

_.mockImplementation(() => {
  merge: () => {
    return {};
  };
});

jest.mock('browser-sync');
const browserSync = require('browser-sync');

browserSync.mockImplementation(() => {
  return () => {
    return {};
  };
});

describe('Serve config', () => {
  beforeEach(() => {
    console.log = jest.genMockFn();
  });

  it('should exist', () => {
    expect(serve).toBeDefined();
  });

  it('should initialise browserSync', () => {
    process.env.NODE_ENV = 'test';
    serve(mockConfig);
    expect(browserSync).toHaveBeenCalled();
  });

  it('should initialise browserSync', () => {
    process.env.NODE_ENV = 'production';
    serve(mockConfig);
    expect(browserSync).toHaveBeenCalled();
  });

  it('should handle debug mode', () => {
    const expectedBrowserSyncConfig = {
      files: [
        'docs/**/*.css',
        'docs/**/*.js',
        'docs/**/*.jsx',
        'docs/**/*.styl',
        'docs/**/*.less',
        'docs/**/*.scss',
        'docs/**/*.ejs',
        'docs/**/*.html',
        'docs/**/*.md'
      ],
      logLevel: 'info',
      logPrefix: 'Swanky Server',
      notify: false,
      open: false,
      server: {
        baseDir: '/',
        middleware: [
          {

          },
          {

          }
        ]
      }
    };

    serve(mockConfig, { some: 'extra-prop' }, true);
    expect(browserSync).toHaveBeenLastCalledWith(expectedBrowserSyncConfig);
  });
});
