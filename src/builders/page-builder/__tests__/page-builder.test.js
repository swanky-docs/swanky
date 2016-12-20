'use strict';

const pageBuilder = require('./../');

jest.mock('../actions/compile');

describe('contentBuilder', () => {
  it('should exist', () => {
    expect(pageBuilder).toBeDefined();
  });

  it('should orchestrate build pipeline', (done) => {
    pageBuilder.build().then((result) => {
      expect(result).toEqual({});
      done();
    });
  });
});



