'use strict';

const addContent = require('./../add-content');

jest.mock('./../wrap-content');
jest.mock('../compile-snippet');

let mockPage;

beforeEach(() => {
  mockPage = {
    meta: {
      renderTemplate: '<div></div>'
    },
    fileDependencies: [
      {
        key: 'hello-world',
        title: 'Hello World',
        type: 'content',
        contentSrc: ['content/foundation.txt'],
        processedContent: ['Overview']
      },
      {
        key: 'hello-world',
        title: 'Hello World',
        type: 'another-type',
        contentSrc: ['content/foundation.txt'],
        processedContent: ['Overview']
      },
      {
        key: 'hello-world',
        title: 'Hello World',
        type: 'content',
        contentSrc: ['content/foundation.txt'],
        processedContent: ['Foundation']
      }
    ]
  };
});

describe('addContent', () => {
  it('should exist', () => {
    expect(addContent).toBeDefined();
  });

  it('should filter fileDependencies that are not of type content', (done) => {
    addContent(mockPage).then((result) => {
      expect(result.length).toEqual(2);
      done();
    });
  });

  it('should return a decorated content object', (done) => {
    addContent(mockPage).then((result) => {
      expect(result[0].key).toBeDefined();
      expect(result[0].title).toBeDefined();
      expect(result[0].content).toBeDefined();
      done();
    });
  });
});
