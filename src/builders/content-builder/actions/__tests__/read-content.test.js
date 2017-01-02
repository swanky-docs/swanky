'use strict';

const path = require('path');
const readContent = require('./../read-content');

jest.mock('request');
const request = require('request');

let mockPage;
let mockResult;

beforeEach(() => {
  console.log = jest.genMockFn();

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
          'http://some-url.com'
        ]
      }
    ]
  };

  mockResult = [
    {
      processedContent: 'Overview'
    },
    {
      processedContent: 'Hello World'
    }
  ];
});

describe('getSnippet', () => {
  it('should exist', () => {
    expect(readContent).toBeDefined();
  });

  it('should filter fileDependencies that are not of type content', () => {
    return readContent(mockPage.fileDependencies[1]).then(() => {
      expect(mockPage.fileDependencies[1].processedContent[0]).toBeUndefined();
    });
  });

  it('should read fileDependencies for valid internal content sources', () => {
    return readContent(mockPage.fileDependencies[0]).then(() => {
      expect(mockPage.fileDependencies[0].processedContent[0]).toBe(mockResult[0].processedContent);
    });
  });

  it('should read fileDependencies for valid external content sources', () => {
    return readContent(mockPage.fileDependencies[2]).then(() => {
      expect(mockPage.fileDependencies[2].processedContent[0]).toBe(mockResult[1].processedContent);
    });
  });

  it('should handle an error for invalid external content sources', () => {
    request.__setMockResponse({
      error: true,
      response: {
        statusCode: 500
      }
    });

    return readContent(mockPage.fileDependencies[2]).then(() => {
      expect(mockPage.fileDependencies[2].processedContent[0]).toBeUndefined();
    });
  });
});
