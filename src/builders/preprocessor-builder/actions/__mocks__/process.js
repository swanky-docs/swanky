'use strict';

const Promise = require('bluebird');

let mockResponse = {};

function __setMockResponse(newMockResponse) {
  mockResponse = newMockResponse;
}

const process = () => {
  return new Promise((resolve) => resolve(mockResponse));
};

process.__setMockResponse = __setMockResponse;

module.exports = process;
