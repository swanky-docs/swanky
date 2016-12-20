'use strict';

let mockResponse = {
  theme: 'path/to/theme'
};

function __setMockResponse(newMockResponse) {
  mockResponse = newMockResponse;
}

const getSectionsConfig = jest.fn(() => mockResponse);

getSectionsConfig.__setMockResponse = __setMockResponse;

module.exports = getSectionsConfig;
