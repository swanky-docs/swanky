'use strict';

const Promise = require('bluebird');

let mockResponse = {};

function __setMockResponse(newMockResponse) {
  mockResponse = newMockResponse;
}

const addContent = () => {
  return new Promise((resolve) => resolve(mockResponse));
};

addContent.__setMockResponse = __setMockResponse;

module.exports = addContent;
