'use strict';

const path = require('path');
const contentBuilder = require('./../');

jest.mock('./../actions/read-content');
jest.mock('./../actions/add-content');

const mockPage = {
  fileDependencies: [
    {
      type: 'content',
      processedContent: [],
      contentSrc: [
        path.join(__dirname, './../__mocks__/__fixtures__/content', 'overview.md')
      ]
    }
  ]
};

describe('contentBuilder', () => {
  it('should exist', () => {
    expect(contentBuilder).toBeDefined();
  });

  it('should orchestrate build pipeline', (done) => {
    contentBuilder.build(mockPage).then((result) => {
      expect(result).toEqual({});
      done();
    });
  });
});
