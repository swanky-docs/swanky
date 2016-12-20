'use strict';

const isExternal = require('../is-external');

describe('getKey', () => {
  it('should exist', () => {
    expect(isExternal).toBeDefined();
  });

  it('should return true for http links', () => {
    expect(isExternal('http://google.com')).toBeTruthy();
  });

  it('should return true for https links', () => {
    expect(isExternal('https://google.com')).toBeTruthy();
  });

  it('should return false for non http/https links', () => {
    expect(isExternal('~/user/local/path')).toBeFalsy();
  });
});
