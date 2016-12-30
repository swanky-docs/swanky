'use strict';

const path = require('path');
const loadConfig = require('../load-config');
const expectedResult = { 'title': 'test' };

describe('loadConfig', () => {
  it('should exist', () => {
    expect(loadConfig).toBeDefined();
  });

  it('should parse a yaml config', () => {
    const yamlConfig = path.join(__dirname, './../__mocks__/__fixtures__/config/yamlConfig.yaml');

    expect(loadConfig(yamlConfig)).toEqual(expectedResult);
  });

  it('should parse an empty yaml config', () => {
    const yamlConfig = path.join(__dirname, './../__mocks__/__fixtures__/config/yamlConfigEmpty.yaml');

    expect(loadConfig(yamlConfig)).toEqual({});
  });

  it('should parse a json config', () => {
    const jsonConfig = path.join(__dirname, './../__mocks__/__fixtures__/config/jsonConfig.json');

    expect(loadConfig(jsonConfig)).toEqual(expectedResult);
  });

  it('should parse a js config', () => {
    const jsConfig = path.join(__dirname, './../__mocks__/__fixtures__/config/jsConfig.js');

    expect(loadConfig(jsConfig)).toEqual(expectedResult);
  });

  it('should throw an error if config does not exist', () => {
    const noConfig = 'src/utils/test/fixtures/no-yamlConfig.yaml';

    expect(() => loadConfig(noConfig)).toThrow();
  });
});
