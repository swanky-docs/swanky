'use strict';

const contentListBuilder = require('./../');

jest.mock('./../actions/get-list');

describe('contentBuilder', () => {
  it('should exist', () => {
    expect(contentListBuilder).toBeDefined();
  });

  it('should orchestrate build pipeline', (done) => {
    contentListBuilder.build().then((result) => {
      expect(result).toEqual('A string of text.');
      done();
    });
  });
});
