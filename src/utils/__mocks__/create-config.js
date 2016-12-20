'use strict';

let mockResponse = {};

function __setMockResponse(newMockResponse) {
  mockResponse = newMockResponse;
}

const createConfig = jest.fn(() => mockResponse);

createConfig.__setMockResponse = __setMockResponse;

module.exports = createConfig;
