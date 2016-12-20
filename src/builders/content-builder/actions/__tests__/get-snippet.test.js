'use strict';

const getSnippet = require('./../get-snippet');

jest.mock('../compile-snippet');
const compileSnippet = require('../compile-snippet');

compileSnippet.mockImplementation(() => '<div>Any Snippet</div>');

describe('getSnippet', () => {
  it('should exist', () => {
    expect(getSnippet).toBeDefined();
  });

  it('should compile a single snippet', () => {
    const mockTemplateStr = 'some-template';
    const mockTemplateData = 'some data';

    expect(getSnippet([mockTemplateStr, mockTemplateData], {})).toEqual('<div>Any Snippet</div>');
  });

  it('should compile a single snippet without any template data', () => {
    const mockTemplateStr = 'some-template';

    expect(getSnippet([mockTemplateStr], {})).toEqual('<div>Any Snippet</div>');
  });

  it('should handle an array of snippets', () => {
    const mockData = [
      {
        template: 'some-template',
        data: 'some data',
      },
      {
        template: 'some-template',
        data: 'some data',
      }
    ];

    expect(getSnippet([mockData], {})).toEqual('<div>Any Snippet</div>\n\n<div>Any Snippet</div>');
  });
});
