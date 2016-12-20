'use strict';

let mockResponse = {};

function __setMockResponse(newMockResponse) {
  mockResponse = newMockResponse;
}

const loadConfig = jest.fn(() => mockResponse);

loadConfig.__setMockResponse = __setMockResponse;

module.exports = loadConfig;
