'use strict';

let mockResponse = {};

function __setMockResponse(newMockResponse) {
  mockResponse = newMockResponse;
}

const preprocessCss = jest.fn(() => mockResponse);

preprocessCss.__setMockResponse = __setMockResponse;

module.exports = preprocessCss;
