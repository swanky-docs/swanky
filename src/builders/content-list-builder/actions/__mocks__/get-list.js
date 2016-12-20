'use strict';

const Promise = require('bluebird');

let mockResponse = 'A string of text.';

function __setMockResponse(newMockResponse) {
  mockResponse = newMockResponse;
}

const getList = () => {
  return new Promise((resolve) => resolve(mockResponse));
};

getList.__setMockResponse = __setMockResponse;

module.exports = getList;
