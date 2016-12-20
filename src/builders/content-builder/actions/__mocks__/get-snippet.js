'use strict';

let mockResponse = '<div>A rendered snippet.</div>';

function __setMockResponse(newMockResponse) {
  mockResponse = newMockResponse;
}

const getSnippet = () => {
  return mockResponse;
};

getSnippet.__setMockResponse = __setMockResponse;

module.exports = getSnippet;
