'use strict';

const classy = require('../classy');

describe('classy', () => {
  it('should exist', () => {
    expect(classy).toBeDefined();
  });

  it('should insert class variables inside of html tags', () => {
    const renderFn = classy()[0].filter;

    expect(renderFn('<h1>Hello</h1>')).toEqual('<h1 class=\"{$ styles.h1 $}\">Hello</h1>');
    expect(renderFn('<strong>Hello</strong>')).toEqual('<strong class=\"{$ styles.strong $}\">Hello</strong>');
    expect(renderFn('<p>Hello</p>')).toEqual('<p class=\"{$ styles.p $}\">Hello</p>');
  });
});
