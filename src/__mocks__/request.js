'use strict';

let mockResponse = {
  error: false,
  response: {
    statusCode: 200
  },
  body: 'Hello World'
};

function __setMockResponse(newMockResponse) {
  mockResponse = newMockResponse;
}

const request = (config, cb) => {
  cb(mockResponse.error, mockResponse.response, mockResponse.body);
};

request.__setMockResponse = __setMockResponse;

module.exports = request;
