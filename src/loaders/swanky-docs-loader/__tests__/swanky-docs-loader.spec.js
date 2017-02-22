'use strict';

const Promise = require('bluebird');
const swankyDocsLoader = require('./../');

jest.mock('./../../../builders');
let builders = require('./../../../builders');

builders.contentListBuilder.build.mockImplementation(() => {
  return new Promise((resolve) => resolve());
});

builders.preprocessorBuilder.build.mockImplementation(() => {
  return new Promise((resolve) => resolve());
});

builders.contentBuilder.build.mockImplementation(() => {
  return new Promise((resolve) => resolve());
});

builders.pageBuilder.build.mockImplementation(() => {
  return new Promise((resolve) => resolve());
});

jest.mock('querystring');

let querystring = require('querystring');

querystring.parse.mockImplementation(() => {
  return JSON.stringify({
    options: {
      key: 'foundation',
      swankyDocs: {},
      swankyDocsLoader: {}
    }
  });
});

jest.mock('lodash');
const _ = require('lodash');


beforeEach(() => {
  this.query = "somequerysting";

  _.find.mockImplementation(() => {
    return {
      meta: {
        fileDependencies: ['layouts/default.html']
      },
      fileDependencies: [
        {
          contentSrc: ['some-file-dep.md']
        }
      ]
    };
  });
});

describe('swankyDocsLoader', () => {
  it('should exist', () => {
    expect(swankyDocsLoader).toBeDefined();
  });

  it('should add site fileDependencies', (done) => {
    let fileDependencies = [];

    const callback = () => {
      return () => {
        expect(fileDependencies[0]).toEqual('layouts/default.html');
        done();
      };
    };

    swankyDocsLoader.call({
      async: callback,
      query: '?options = {}',
      cacheable: () => true,
      addDependency: (dep) => fileDependencies.push(dep)
    });
  });

  it('should add page fileDependencies', (done) => {
    let fileDependencies = [];

    const callback = () => {
      return () => {
        expect(fileDependencies[1]).toEqual('some-file-dep.md');
        done();
      };
    };

    swankyDocsLoader.call({
      async: callback,
      query: '?options = {}',
      cacheable: () => true,
      addDependency: (dep) => fileDependencies.push(dep)
    });
  });
});
