'use strict';

// Minimal Content Object
let mockResponse = {
  title: 'A title',
  key: 'some-unique-key',
  contentSrc: ['some/path/to/content'],
  preprocessor: null,
  processedContent: ['Some processed content'],
  compiledContent: ['<div>Some compiled content</div>'],
  type: 'content',
};

function contentFactory() {
  return mockResponse;
};

contentFactory.__setMockResponse = function(newMockResponse) {
  mockResponse = newMockResponse;
};

contentFactory.__setKeyValue = function(key, value) {
  mockResponse[key] = value;
};

module.exports = contentFactory;