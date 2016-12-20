'use strict';

const Promise = require('bluebird');

let mockResponse = {};

function __setMockResponse(newMockResponse) {
  mockResponse = newMockResponse;
}

const compile = () => {
  return new Promise((resolve) => resolve(mockResponse));
};

compile.__setMockResponse = __setMockResponse;

module.exports = compile;
