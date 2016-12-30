'use strict';

const path = require('path');
const webpack = require('webpack');
let mockSwankyConfig;

jest.mock('./../../../utils/get-sections-config');
const getSectionsConfig = require('./../../../utils/get-sections-config');

jest.mock('./../../../loaders/bootstrap-loader');

beforeEach(() => {
  mockSwankyConfig = {
    meta: {
      title: 'Swanky Docs',
      repo: 'https://github.com',
      version: '0.0.0',
      src: path.join(__dirname, './../__mocks__/__fixtures__/docs'),
      snippets: path.join(__dirname, './../__mocks__/__fixtures__/docs/snippets'),
      theme: path.join(__dirname, './../__mocks__/__fixtures__/docs/theme'),
      layouts: path.join(__dirname, './../__mocks__/__fixtures__/docs/theme/templates/layouts'),
      partials: path.join(__dirname, './../__mocks__/__fixtures__/docs/theme/templates/partials'),
      output: path.join(__dirname, './../__mocks__/__fixtures__/docs/build')
    },
    snippets: path.join(__dirname, './../__mocks__/__fixtures__/docs/snippets'),
    bootstrap: null,
    theme: 'theme',
    sections: [
      {
        title: 'A title',
        content: 'path/to/content/foundation.md',
        subSections: [
          {
            title: 'A button',
            content: 'path/to/content/button.md'
          }
        ]
      },
      {
        title: 'Another title',
        content: 'path/to/content/resources.md'
      }
    ]
  };

  getSectionsConfig.__setMockResponse([
    {
      key: 'some-key',
      title: 'A title',
      filename: 'filename.html',
      url: 'some-url.html',
      content: 'Hello World',
      bootstrap: [
        path.join(__dirname, './../__mocks__/__fixtures__/docs/bootstrap/angular.bootstrap.js')
      ]
    },
    {
      key: 'some-key',
      title: 'A title',
      filename: 'filename.html',
      url: 'some-url.html',
      content: 'Hello World'
    }
  ]);
});

describe('Webpack config', () => {
  let webpackConfigMerger;

  beforeEach(() => {
    webpackConfigMerger = require('./../webpack.config');
  });

  function mergeConfig(swankyConfig, webpackBaseConfig) {
    return webpackConfigMerger(webpackBaseConfig || { plugins: [new webpack.HotModuleReplacementPlugin()] }, swankyConfig);
  }

  it('should exist', () => {
    expect(webpackConfigMerger).toBeDefined();
  });

  it('should output the website to the directory in the Swanky config', () => {
    let config = mergeConfig(mockSwankyConfig);

    expect(config.output.path.search(/build$/) > -1).toBeTruthy();
  });

  it('should correctly handle the docs entry point for production builds', () => {
    // Update config to be production
    mockSwankyConfig.meta.production = true;
    let config = mergeConfig(mockSwankyConfig);

    expect(config.entry.docs).toEqual([path.join(__dirname, './../__mocks__/__fixtures__/docs/docs.js')]);
  });

  it('should not create a snippets entry point if specified snippets folder does not exist', () => {
    // Add snippets back in
    mockSwankyConfig.meta.snippets = 'some/non/existent/directory';
    let config = mergeConfig(mockSwankyConfig);

    expect(config.entry.snippets).not.toBeDefined();
  });

  it('should create a snippets entry point', () => {
    // Add snippets back in
    let config = mergeConfig(mockSwankyConfig);

    expect(config.entry.snippets).toBeDefined();
  });

  it('should not bootstrap script if one does not exist', () => {

    // Set a new mock response with no bootstrap script
    getSectionsConfig.__setMockResponse([
      {
        key: 'some-key',
        title: 'A title',
        filename: 'filename.html',
        url: 'some-url.html',
        content: 'Hello World'
      }
    ]);

    let config = mergeConfig(mockSwankyConfig);

    expect(config.entry.bootstrap).not.toBeDefined();
  });
});