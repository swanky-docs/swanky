'use strict';

let mockResponse = '<code>A rendered code snippet.</code>';

function __setMockResponse(newMockResponse) {
  mockResponse = newMockResponse;
}

const renderCodeSnippet = () => {
  return mockResponse;
};

renderCodeSnippet.__setMockResponse = __setMockResponse;

module.exports = renderCodeSnippet;
