'use strict';

const getList = require('./../get-list');

jest.mock('./../../../../factories/content-factory');

describe('getList', () => {
  it('should exist', () => {
    expect(getList).toBeDefined();
  });

  it('should return a list of content from a single source', (done) => {
    const page = {
      content: '/src/builders/content-list-builder/actions/test/fixtures/docs/content/foundation/01-overview.md'
    };

    const contentListResult = {
      'contentSrc': ['some/path/to/content'],
      'processedContent': [],
      'compiledContent': [],
      'title': undefined,
      'preprocessor': undefined,
      'type': 'content'
    };

    getList(page).then((result) => {
      expect(result.fileDependencies[0].contentSrc).toEqual(contentListResult.contentSrc);
      done();
    });
  });

  it('should return a list of content from an array of content', (done) => {
    const page = {
      content: [
        {
          src: '/src/builders/content-list-builder/actions/test/fixtures/docs/content/foundation/01-overview.md'
        },
        {
          title: 'Colour Palette',
          src: '/src/builders/content-list-builder/actions/test/fixtures/docs/content/foundation/02-colour-palette.md'
        }
      ]
    };

    getList(page).then((result) => {
      expect(result.fileDependencies.length).toEqual(2);
      done();
    });
  });
});
