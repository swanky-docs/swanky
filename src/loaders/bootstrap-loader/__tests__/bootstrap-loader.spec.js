'use strict';

const bootstrapLoader = require('./../');

describe('bootstrapLoader', () => {
  it('should exist', () => {
    expect(bootstrapLoader).toBeDefined();
  });

  it('should add relative path to existing source', () => {
    const source = 'BASE_PATH\nand some text';

    bootstrapLoader.call({
      query: '?src=src/loaders/bootstrap-loader/__mocks__/__fixtures__/snippets',
      cacheable: () => true,

      callback: (error, modifiedSource) => {
        expect(modifiedSource).toEqual(`'use strict'
module.exports = (function() {
    require('src/loaders/bootstrap-loader/__mocks__/__fixtures__/snippets/mock-index.js');
  })();`);
      }
    }, source);
  });
});
