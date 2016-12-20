'use strict';

const path = require('path');
const readContent = require('./../read-content');

let mockPage;
let mockResult;

beforeEach(() => {
  mockPage = {
    // We only care about file dependencies here
    fileDependencies: [
      {
        type: 'content',
        processedContent: [],
        contentSrc: [
          path.join(__dirname, './../__mocks__/__fixtures__/content', 'overview.md')
        ]
      },
      {
        type: 'anything',
        processedContent: [],
        contentSrc: [
          path.join(__dirname, './../__mocks__/__fixtures__/content', 'some-random-file.md')
        ]
      },
      {
        type: 'content',
        processedContent: [],
        contentSrc: [
          path.join(__dirname, './../__mocks__/__fixtures__/content', 'foundation.txt')
        ]
      }
    ]
  };

  mockResult = [
    {
      processedContent: 'Overview'
    },
    {
      processedContent: 'Foundation'
    }
  ];
});

describe('getSnippet', () => {
  it('should exist', () => {
    expect(readContent).toBeDefined();
  });

  it('should filter fileDependencies that are not of type content', (done) => {
    readContent(mockPage).then(() => {
      const result = mockPage.fileDependencies.filter((item) => !!item.processedContent[0]);

      expect(result.length).toEqual(2);
      done();
    });
  });

  it('should read fileDependencies for valid content sources', (done) => {
    readContent(mockPage).then(() => {
      const result = mockPage.fileDependencies.filter((item) => !!item.processedContent[0]);

      result.forEach((item, index) => {
        expect(item.processedContent[0]).toBe(mockResult[index].processedContent);
      });

      done();
    });
  });
});
