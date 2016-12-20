'use strict';

const contentFactory = require('../content-factory');

jest.mock('./../../utils/get-key');

jest.mock('./../../utils/generate-key');
const generateKey = require('./../../utils/generate-key');

jest.mock('./../../utils/is-external');
const isExternal = require('./../../utils/is-external');

describe('contentFactory', () => {
  it('should exist', () => {
    expect(contentFactory).toBeDefined();
  });

  it('should return a Content object', () => {
    const item = { title: '01 Colour Palette', src: 'docs/content/foundation/01-overview.md' };

    const result = {
      'title': '01 Colour Palette',
      'compiledContent': [],
      'contentSrc': [],
      'key': 'uid123456789',
      'preprocessor': undefined,
      'processedContent': [],
      'type': 'content'
    };

    expect(contentFactory(item, item.title)).toEqual(result);
  });

  it('should generate key if not provided', () => {
    const item = { src: 'docs/content/foundation/01-overview.md' };

    contentFactory(item);
    expect(generateKey).toHaveBeenCalled();
  });

  it('should add external content resources', () => {
    isExternal.__setMockResponse(true);
    const item = { src: 'http://google.com' };

    expect(contentFactory(item).contentSrc).toEqual(['http://google.com']);
  });
});
