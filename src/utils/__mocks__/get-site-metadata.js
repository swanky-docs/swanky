'use strict';

let mockResponse = {
  theme: 'path/to/theme'
};

function __setMockResponse(newMockResponse) {
  mockResponse = newMockResponse;
}

const getSiteMetadata = jest.fn(() => mockResponse);

getSiteMetadata.__setMockResponse = __setMockResponse;

module.exports = getSiteMetadata;
