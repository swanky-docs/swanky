'use strict';

const path = require('path');
const siteFactory = require('../site-factory');

let site;
let expectedResult;

beforeEach(() => {
  site = {
    title: 'My Swanky Docs',
    output: 'src/factories/__mocks__/__fixtures__/docs',
    src: 'src/factories/__mocks__/__fixtures__/src',
    theme: 'src/factories/__mocks__/__fixtures__/theme',
    snippets: 'src/factories/__mocks__/__fixtures__/src/snippets',
    layouts: 'src/factories/__mocks__/__fixtures__/theme/templates/layouts',
    partials: 'src/factories/__mocks__/__fixtures__/theme/templates/partials',
    version: '1.0.0',
    repo: 'https://github.com',
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

  expectedResult = {
    title: 'My Swanky Docs',
    src: path.join(__dirname, './../__mocks__/__fixtures__/src'),
    output: path.join(__dirname, './../__mocks__/__fixtures__/docs'),
    navigation: [
      {
        key: 'a-title',
        title: 'A title',
        url: 'index.html',
        children: [
          {
            key: 'a-title-a-button',
            title: 'A button',
            url: 'a-title/a-button.html'
          }
        ]
      },
      {
        key: 'another-title',
        title: 'Another title',
        url: 'another-title.html'
      }
    ],
    theme: path.join(__dirname, './../__mocks__/__fixtures__/theme'),
    layouts: path.join(__dirname, './../__mocks__/__fixtures__/theme/templates/layouts'),
    partials: path.join(__dirname, './../__mocks__/__fixtures__/theme/templates/partials'),
    snippets: path.join(__dirname, './../__mocks__/__fixtures__/src/snippets'),
    renderTemplate: '<div>render template</div>',
    snippetTemplate: '<div>snippet template</div>',
    contentWrapperTemplate: '<div>content wrapper template</div>',
    fileDependencies: [],
    repository: 'https://github.com',
    production: false,
    serverPath: '/',
    version: '1.0.0'
  };
});

describe('siteFactory', () => {
  it('should exist', () => {
    expect(siteFactory).toBeDefined();
  });

  it('should create a Site object', () => {
    expect(siteFactory(site)).toEqual(expectedResult);
  });

  it('should throw an error if no config is provided', () => {
    expect(() => siteFactory()).toThrowError('Missing Swanky config.');
  });

  it('should throw an error if no theme is specified', () => {
    delete site.theme; // remove the theme key completely

    expect(() => siteFactory(site)).toThrowError('Missing "theme" property. "theme" MUST be specified in Swanky config.');
  });

  it('should provide defaults for values that are not provided', () => {
    // Remove values
    delete site.title;
    delete site.src;
    delete site.output;
    delete site.repo;
    delete site.version;
    delete site.snippets;
    delete site.layouts;
    delete site.partials;

    // update result object to match defaults
    expectedResult.title = 'Swanky Docs';
    expectedResult.src = path.join(process.cwd(), 'docs');
    expectedResult.output = path.join(process.cwd(), 'build');
    expectedResult.snippets = path.join(process.cwd(), 'docs/snippets');
    expectedResult.version = '0.0.0';
    expectedResult.repository = null;

    expect(siteFactory(site)).toEqual(expectedResult);
  });

  it('should create a default section if no sections are provided', () => {
    // Remove the mock section
    delete site.sections;

    expectedResult.navigation = [
      {
        'key': 'no-content',
        'title': 'No Content',
        'url': 'index.html'
      }
    ];

    expect(siteFactory(site)).toEqual(expectedResult);
  });

  it('should add a serverPath if provided', () => {
    // Create sub-folder path
    site.serverPath = 'sub-folder';
    expectedResult.serverPath = '/sub-folder/';

    expect(siteFactory(site)).toEqual(expectedResult);
  });
});
