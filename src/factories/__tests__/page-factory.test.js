'use strict';

const path = require('path');
const pageFactory = require('../page-factory');

// Mock data
let page;

const meta = {
  layouts: 'layouts'
};

const parent = null;

let expectResult;

beforeEach(() => {
  page = {
    title: 'A title',
    content: 'path/to/content/foundation.md',
    preprocessor: null,
    layout: 'default.html'
  };

  expectResult = {
    key: 'a-title',
    layoutSrc: 'layouts/default.html',
    meta: {
      layouts: 'layouts',
    },
    bootstrap: [],
    parentKey: null,
    preprocessor: null,
    title: 'A title',
    filename: 'a-title.html',
    url: 'a-title.html',
    content: 'path/to/content/foundation.md'
  };
});

describe('pageFactory', () => {
  it('should exist', () => {
    expect(pageFactory).toBeDefined();
  });

  it('should return a new Page object', () => {
    expect(pageFactory(page, meta, parent)).toEqual(expectResult);
  });

  it('should return a new Page object for `child` pages', () => {
    const hasParent = 'I am the parent of this page';

    expectResult.key = 'i-am-the-parent-of-this-page-a-title';
    expectResult.parentKey = 'i-am-the-parent-of-this-page';
    expectResult.url = 'i-am-the-parent-of-this-page/a-title.html';

    expect(pageFactory(page, meta, hasParent)).toEqual(expectResult);
  });

  it('should provide default layout template path if not specified', () => {
    delete page.layout; // delete page key

    expect(pageFactory(page, meta, parent)).toEqual(expectResult);
  });

  it('should add page specific scripts', () => {
    page.bootstrap = ['some-script.js'];
    expectResult.bootstrap = [path.join(process.cwd(), 'some-script.js')];

    expect(pageFactory(page, meta, parent)).toEqual(expectResult);
  });
});
