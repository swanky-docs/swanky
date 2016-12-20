'use strict';

// Minimal Site Object
let mockResponse = {
  title: 'A title',
  src: '/src',
  output: '/docs',
  navigation: [],
  theme: '/src/theme',
  layouts: '/src/layouts',
  partials: '/src/partials',
  snippets: '/src/snippets',
  renderTemplate: 'render.html',
  snippetTemplate: 'snippet.html',
  contentWrapperTemplate: 'content-wrapper.html',
  fileDependencies: [],
  repository: null,
  production: false,
  serverPath: '/',
  version: '1.0.0'
};

function siteFactory() {
  return mockResponse;
};

siteFactory.__setMockResponse = function(newMockResponse) {
  mockResponse = newMockResponse;
};

siteFactory.__setKeyValue = function(key, value) {
  mockResponse[key] = value;
};

module.exports = siteFactory;