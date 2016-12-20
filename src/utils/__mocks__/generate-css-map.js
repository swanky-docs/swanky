'use strict';

let mockResponse = {};

function __setMockResponse(newMockResponse) {
  mockResponse = newMockResponse;
}

const generateCssMap = jest.fn(() => mockResponse);

generateCssMap.__setMockResponse = __setMockResponse;

module.exports = generateCssMap;
