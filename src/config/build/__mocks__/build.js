'use strict';

let mockResponse = {};

function __setMockResponse(newMockResponse) {
  mockResponse = newMockResponse;
}

const build = jest.fn(() => mockResponse);

build.__setMockResponse = __setMockResponse;

module.exports = build;
