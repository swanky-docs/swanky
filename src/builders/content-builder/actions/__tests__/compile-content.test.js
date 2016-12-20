'use strict';

const compileContent = require('../compile-content');

jest.mock('./../render-snippet');
jest.mock('./../render-code-snippet');

let mockPage;
let mockItem;
let mockFileExtension = null;

beforeEach(() => {
  mockPage = {
    meta: {
      cssMap: {}
    }
  };

  mockItem = {
    content: 'some content string.'
  };
});

describe('compileContent', () => {
  it('should exist', () => {
    expect(compileContent).toBeDefined();
  });

  it('should return compiled content', () => {
    expect(compileContent(mockPage, mockItem, mockFileExtension)).toEqual('some content string.');
  });

  it('should handle compiling markdown content', () => {
    mockFileExtension = '.md';
    expect(compileContent(mockPage, mockItem, mockFileExtension)).toEqual('<p class="">some content string.</p>');
  });
});
