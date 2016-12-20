'use strict';

const builders = require('./../');

describe('actions', () => {
  it('should export actions', () => {
    expect(builders.contentListBuilder).toBeDefined();
    expect(builders.contentBuilder).toBeDefined();
    expect(builders.pageBuilder).toBeDefined();
    expect(builders.preprocessorBuilder).toBeDefined();
  });
});
