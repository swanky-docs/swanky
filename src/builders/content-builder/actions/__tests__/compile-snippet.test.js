'use strict';

const path = require('path');
const compileSnippet = require('../compile-snippet');

let mockTemplateData;
let mockTemplate;
let mockSiteMeta;

beforeEach(() => {
  mockSiteMeta = {
    snippets: path.join(__dirname, './../__mocks__/__fixtures__/snippets')
  };

  mockTemplateData = {
    some: 'value'
  };

  mockTemplate = 'my-snippet';
});

describe('compileSnippet', () => {
  it('should exist', () => {
    expect(compileSnippet).toBeDefined();
  });

  it('should return a template string if no snippet folder exists', () => {
    expect(compileSnippet('some-template', mockTemplateData, {})).toBe('some-template');
  });

  it('should return a template string if snippet does not exists', () => {
    expect(compileSnippet('some-template', mockTemplateData, mockSiteMeta)).toBe('some-template');
  });

  it('should return a rendered template if snippet exists', () => {
    expect(compileSnippet(mockTemplate, mockTemplateData, mockSiteMeta)).toBe('<div>Snippet Template</div>');
  });
});
