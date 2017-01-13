const compile = require('./../compile');
const path = require('path');

describe('compile', () => {
  it('should exist', () => {
    expect(compile).toBeDefined();
  });

  it('should compile a page', (done) => {
    const page = {
      key: '1234',
      url: 'some-url',
      compiledContent: [
        {
          title: 'Title',
          content: 'Some content'
        }
      ],
      parentKey: 'parentKey',
      title: 'Page title',
      contentSrc: [path.join(__dirname, './../__mocks__/__fixtures__/docs/content/foundation.md')],
      layoutSrc: path.join(__dirname, './../__mocks__/__fixtures__/docs/themes/test-theme/templates/layouts/default.html'),
      meta: {
        cssMap: {},
        navigation: [
          {
            key: 'parentKey',
            children: []
          }
        ]
      }
    };

    compile(page).then((result) => {
      expect(result).toBeDefined();
      done();
    });
  });
});
