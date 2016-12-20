'use strict';

let mockResponse = {};

function __setMockResponse(newMockResponse) {
  mockResponse = newMockResponse;
}

const serve = jest.fn(() => mockResponse);

serve.__setMockResponse = __setMockResponse;

module.exports = serve;
