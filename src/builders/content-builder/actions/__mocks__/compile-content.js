'use strict';

const Promise = require('bluebird');

let mockResponse = {};

function __setMockResponse(newMockResponse) {
  mockResponse = newMockResponse;
}

const compileContent = () => {
  return new Promise((resolve) => resolve(mockResponse));
};

compileContent.__setMockResponse = __setMockResponse;

module.exports = compileContent;
