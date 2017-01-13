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
    expect(renderFn('<a href="http://some-url.com">Hello</a>')).toEqual('<a class="{$ styles.a $}" href="http://some-url.com">Hello</a>');
  });

  it('should respect self closing tags', () => {
    const renderFn = classy()[0].filter;

    expect(renderFn('<hr class="some-class"/>')).toEqual('<hr class="some-class {$ styles.hr $}"/>');
    expect(renderFn('<hr/>')).toEqual('<hr class="{$ styles.hr $}"/>');
    expect(renderFn('<hr data-id="some-id"/>')).toEqual('<hr class="{$ styles.hr $}" data-id="some-id"/>');
  });

  it('should retain existing element classes', () => {
    const renderFn = classy()[0].filter;

    expect(renderFn('<p class="some-class">Hello</p>')).toEqual('<p class=\"some-class {$ styles.p $}\">Hello</p>');
  });

  it('should retain existing attributes', () => {
    const renderFn = classy()[0].filter;

    expect(renderFn('<p class="some-class" data-id="4" disabled="true" aria-describedby="el2">Hello</p>'))
      .toEqual('<p class="some-class {$ styles.p $}" data-id="4" disabled="true" aria-describedby="el2">Hello</p>');
  });
});
