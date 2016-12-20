'use strict';

const renderCodeSnippet = require('../render-code-snippet');

jest.mock('./../get-snippet');

let expectedResult;
let mockMetaData;
let mockTemplate;

beforeEach(() => {
  mockTemplate = `
<div class="{$ styles['code-snippet'] $}">
  <div class="{$ styles['example-wrapper'] $}">
    {$ template $}
  </div>
  <div class="{$ styles['code-wrapper'] $}">
    <pre class="line-numbers"><code class="language-markup">{$ encode(template) $}</code></pre>
  </div>
</div>`;

  expectedResult = `
<div class="unique_id_code-snippet">
  <div class="unique_id_example-wrapper">
    <div>A rendered snippet.</div>
  </div>
  <div class="unique_id_code-wrapper">
    <pre class="line-numbers"><code class="language-markup">&#x3C;div&#x3E;A rendered snippet.&#x3C;/div&#x3E;</code></pre>
  </div>
</div>`;

  mockMetaData = {
    cssMap: {
      'code-snippet': 'unique_id_code-snippet',
      'code-wrapper': 'unique_id_code-wrapper',
      'example-wrapper': 'unique_id_example-wrapper'
    }
  };
});

describe('renderCodeSnippet', () => {
  it('should exist', () => {
    expect(renderCodeSnippet).toBeDefined();
  });

  it('should return a rendered and encoded snippet', () => {
    const renderFn = renderCodeSnippet(mockMetaData, mockTemplate);

    expect(renderFn()).toBe(expectedResult);
  });
});
