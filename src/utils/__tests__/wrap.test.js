'use strict';

const wrap = require('../wrap');

describe('wrap', () => {
  it('should exist', () => {
    expect(wrap).toBeDefined();
  });

  it('should wrap test within html tags', () => {
    const renderFn = wrap()[0].filter;

    expect(renderFn('[wrap class="foo"]Hello[/wrap]')).toEqual('<div class="foo"><p>Hello</p></div>');
    expect(renderFn('[wrap class="foo bar"]Hello[/wrap]')).toEqual('<div class="foo bar"><p>Hello</p></div>');
    expect(renderFn('[wrap]Hello[/wrap]')).toEqual('<div><p>Hello</p></div>');
  });
});
