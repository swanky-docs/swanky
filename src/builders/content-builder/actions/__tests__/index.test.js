'use strict';

const actions = require('../index');

describe('actions', () => {
  it('should export actions', () => {
    expect(actions.renderSnippet).toBeDefined();
    expect(actions.renderCodeSnippet).toBeDefined();
    expect(actions.getSnippet).toBeDefined();
  });
});
