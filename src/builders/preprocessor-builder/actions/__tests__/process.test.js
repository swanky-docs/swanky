'use strict';

const path = require('path');
const process = require('./../process');

const mockProcessor = path.join(__dirname, './../__mocks__/__fixtures__/some-preprocessor');

describe('getList', () => {
  it('should exist', () => {
    expect(process).toBeDefined();
  });

  it('should run specified preprocessor', (done) => {
    const page = {
      fileDependencies: [
        {
          src: 'some/path',
          preprocessor: {
            [mockProcessor]: {}
          }
        }
      ]
    };

    process(page).then((result) => {
      expect(result).toEqual([ { compiledContent: 'compiled content' } ]);
      done();
    });
  });

  it('should not run processor if not specified', (done) => {
    const page = {
      fileDependencies: [
        {
          src: 'some/path'
        }
      ]
    };

    process(page).then((result) => {
      expect(result).toEqual([undefined]);
      done();
    });
  });
});
