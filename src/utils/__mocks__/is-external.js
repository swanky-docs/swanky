'use strict';

let mockResponse = false;

function __setMockResponse(newMockResponse) {
  mockResponse = newMockResponse;
}

const isExternal = jest.fn(() => mockResponse);

isExternal.__setMockResponse = __setMockResponse;

module.exports = isExternal;
