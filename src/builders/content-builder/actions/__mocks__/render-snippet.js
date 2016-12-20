'use strict';

let mockResponse = '<div>A rendered snippet.</div>';

function __setMockResponse(newMockResponse) {
  mockResponse = newMockResponse;
}

const renderSnippet = () => {
  return mockResponse;
};

renderSnippet.__setMockResponse = __setMockResponse;

module.exports = renderSnippet;
