'use strict';

const contentBuilder = require('./../');

jest.mock('./../actions/read-content');
jest.mock('./../actions/add-content');

describe('contentBuilder', () => {
  it('should exist', () => {
    expect(contentBuilder).toBeDefined();
  });

  it('should orchestrate build pipeline', (done) => {
    contentBuilder.build().then((result) => {
      expect(result).toEqual({});
      done();
    });
  });
});
