'use strict';

let mockResponse = '<div>A wrapped string of text.</div>';

function __setMockResponse(newMockResponse) {
  mockResponse = newMockResponse;
}

const wrapContent = () => {
  return mockResponse;
};

wrapContent.__setMockResponse = __setMockResponse;

module.exports = wrapContent;
