'use strict';

let mockResponse = 'random-key';

function __setMockResponse(newMockResponse) {
  mockResponse = newMockResponse;
}

const generateKey = jest.fn(() => mockResponse);

generateKey.__setMockResponse = __setMockResponse;

module.exports = generateKey;
