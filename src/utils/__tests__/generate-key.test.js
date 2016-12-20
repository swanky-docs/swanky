'use strict';

const generateKey = require('../generate-key');

describe('generateKey', () => {
  it('should exist', () => {
    expect(generateKey).toBeDefined();
  });

  it('should generate a 12 character key', () => {
    expect(generateKey().length).toEqual(12);
  });
});
