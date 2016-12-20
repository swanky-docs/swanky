'use strict';

const renderSnippet = require('../render-snippet');

// Mock compileSnippet module
jest.mock('../get-snippet');

let mockMetaData;
let mockTemplate;
let expectedResult;

beforeEach(() => {
  mockMetaData = {
    cssMap: {
      foo: 'bar'
    }
  };

  mockTemplate = '<div class="{$ styles.foo $}">{$ template $}</div>';

  expectedResult = '<div class="bar"><div>A rendered snippet.</div></div>';
});

describe('renderSnippet', () => {
  it('should exist', () => {
    expect(renderSnippet).toBeDefined();
  });

  it('should return a rendered snippet', () => {
    const renderFn = renderSnippet(mockMetaData, mockTemplate);

    expect(renderFn()).toBe(expectedResult);
  });

  it('should return a rendered snippet', () => {
    const renderFn = renderSnippet(mockMetaData, mockTemplate);

    expect(renderFn()).toBe(expectedResult);
  });
});