'use strict';

const Promise = require('bluebird');

let mockResponse = 'A string of text.';

function __setMockResponse(newMockResponse) {
  mockResponse = newMockResponse;
}

const readContent = () => {
  return new Promise((resolve) => resolve(mockResponse));
};

readContent.__setMockResponse = __setMockResponse;

module.exports = readContent;
