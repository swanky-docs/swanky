'use strict';

const shortCode = require('../short-code');

describe('shortCode', () => {
  it('should exist', () => {
    expect(shortCode).toBeDefined();
  });

  it('should process a snippet', () => {
    const renderFn = shortCode()[0].filter;

    expect(renderFn('[code hello]')).toEqual('sWaNkY-md-0!');
  });

  it('should process a snippet group', () => {
    const renderFn = shortCode()[1].filter;

    expect(renderFn('[code-group][code foo="bar"][/code-group]')).toEqual('sWaNkY-md-0!');
  });

  it('should process a placeholder', () => {
    const matches = ['Hello Worlds!'];
    const renderFn = shortCode(matches)[2].filter;

    expect(renderFn('<p>' + 'sWaNkY-md-0!' + '</p>')).toEqual('Hello Worlds!');
  });
});
