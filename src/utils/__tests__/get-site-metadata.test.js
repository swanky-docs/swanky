'use strict';

const path = require('path');
const getSiteMetadata = require('../get-site-metadata');
const mockConfig = {}; // this value will be mocked by the siteFactory mock

jest.mock('./../../factories/site-factory');
const siteFactory = require('./../../factories/site-factory');

// Set real paths so we can test the assets being added to the fileDependencies key
siteFactory.__setKeyValue('snippets', path.join(__dirname, './../__mocks__/__fixtures__/snippets'));
siteFactory.__setKeyValue('partials', path.join(__dirname, './../__mocks__/__fixtures__/partials'));
siteFactory.__setKeyValue('layouts', path.join(__dirname, './../__mocks__/__fixtures__/layouts'));

beforeEach(() => {
  // reset the file dependencies
  siteFactory.__setKeyValue('fileDependencies', []);
});

describe('getSiteMetadata', () => {
  it('should exist', () => {
    expect(getSiteMetadata).toBeDefined();
  });

  it('should add all site assets to file dependencies', () => {
    expect(getSiteMetadata(mockConfig).fileDependencies.length).toEqual(6);
  });

  it('should not add site assets to file dependencies if they do not exist', () => {
    // remove the correct path to snippets
    siteFactory.__setKeyValue('snippets', 'some/silly/path');
    expect(getSiteMetadata(mockConfig).fileDependencies.length).toEqual(4);
  });
});
