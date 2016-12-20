'use strict';

const preprocessorBuilder = require('./../');

jest.mock('../actions/process');

describe('contentBuilder', () => {
  it('should exist', () => {
    expect(preprocessorBuilder).toBeDefined();
  });

  it('should orchestrate build pipeline', (done) => {
    preprocessorBuilder.build().then((result) => {
      expect(result).toEqual({});
      done();
    });
  });
});
