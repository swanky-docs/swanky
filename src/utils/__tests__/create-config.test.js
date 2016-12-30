'use strict';

const path = require('path');
const createConfig = require('../create-config');
const swankyConfigFilePath = 'my-swanky.config.yml';

jest.mock('./../generate-css-map');
jest.mock('./../get-site-metadata');
jest.mock('./../load-config');
const loadConfig = require('./../load-config');

describe('createConfig', () => {
  beforeEach(() => {
    loadConfig.__setMockResponse({});
  });

  it('should exist', () => {
    expect(createConfig).toBeDefined();
  });

  it('should try to load the swanky config file from given path', () => {
    createConfig(swankyConfigFilePath);
    expect(loadConfig).toHaveBeenCalledWith(path.join(process.cwd(), swankyConfigFilePath));
  });

  it('should try to load the swanky config file from default path when no path is provided', () => {
    createConfig();
    expect(loadConfig).toHaveBeenCalledWith(path.join(process.cwd(), 'swanky.config.yaml'));
  });

  it('should set site metadata', () => {
    process.env.NODE_ENV = 'development';

    expect(createConfig(swankyConfigFilePath).meta).toEqual({
      'cssMap': {},
      'cssScopedName': '[name]_[local]__[hash:base64:5]',
      'production': false,
      'theme': 'path/to/theme'
    });
  });

  it('should production flag to true when environment variable is set', () => {
    process.env.NODE_ENV = 'production';

    expect(createConfig(swankyConfigFilePath).meta.production).toBeTruthy();
  });
});
