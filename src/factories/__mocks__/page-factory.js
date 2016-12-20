'use strict';

// Minimal Page Object
let mockResponse = {
  key: 'some-key',
  title: 'A title',
  filename: 'filename.html',
  url: 'some-url.html',
  content: 'Hello World'
};

function pageFactory() {
  return mockResponse;
};

pageFactory.__setMockResponse = function(newMockResponse) {
  mockResponse = newMockResponse;
};

pageFactory.__setKeyValue = function(key, value) {
  mockResponse[key] = value;
};

module.exports = pageFactory;
