'use strict';

const getKey = require('../get-key');

describe('getKey', () => {
  it('should exist', () => {
    expect(getKey).toBeDefined();
  });

  it('should generate a consistent key from a string', () => {
    expect(getKey('Hello World')).toEqual('hello-world');
  });

  it('should generate a consistent key from a page with a parent key', () => {
    expect(getKey('Bar', 'Foo')).toEqual('foo-bar');
  });

  it('should strip html tags', () => {
    expect(getKey('<strong>Hello</strong>')).toEqual('hello');
  });
});
