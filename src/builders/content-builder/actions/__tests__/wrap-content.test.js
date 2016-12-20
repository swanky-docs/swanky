'use strict';

const wrapContent = require('../wrap-content');

let mockPage;
let mockCompiledContent;
let mockContentMeta;
let expectedResult;

beforeEach(() => {
  mockPage = {
    parentKey: null,
    meta: {
      cssMap: {
        section: 'unique_id_section',
        h3: 'unique_id_h3',
        h2: 'unique_id_h2'
      },
      contentWrapperTemplate: `
<section id="{$ id $}" class="{$ styles.section $}">
{% if (title and hasPreprocessor) -%}
{% if hasParent -%}
<h3 class="{$ styles.h3 $}">{$ title $}</h3>
{% else -%}
<h2 class="{$ styles.h2 $}">{$ title $}</h2>
{% endif -%}
{% endif -%}
{$ content $}
</section>`
    }
  };

  mockCompiledContent = 'Hello World!';

  mockContentMeta = {
    key: 'unique_id_123456',
    title: 'A section of content',
    preprocessor: true
  };

  expectedResult = `
<section id="unique_id_123456" class="unique_id_section">
<h2 class="unique_id_h2">A section of content</h2>
Hello World!
</section>`;
});

describe('wrapContent', () => {
  it('should exist', () => {
    expect(wrapContent).toBeDefined();
  });

  it('should return a rendered template', () => {
    expect(wrapContent(mockCompiledContent, mockContentMeta, mockPage))
      .toBe(expectedResult);
  });
});