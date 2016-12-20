'use strict';

let mockResponse = 'uid123456789';

function __setMockResponse(newMockResponse) {
  mockResponse = newMockResponse;
}

const getKey = jest.fn(() => mockResponse);

getKey.__setMockResponse = __setMockResponse;

module.exports = getKey;
