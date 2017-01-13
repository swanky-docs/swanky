'use strict';

const index = require('./../index');

jest.mock('./../utils/create-config');
jest.mock('./../config/build/build');
jest.mock('./../config/serve/serve');

const serve = require('./../config/serve/serve');
const build = require('./../config/build/build');

describe('index', () => {
  describe('devServer', () => {
    it('should exist', () => {
      expect(index.devServer).toBeDefined();
    });


    it('should handle debug mode', () => {
      index.devServer({ debug: true });
      expect(serve).toHaveBeenLastCalledWith({}, {}, true);
    });

    it('should handle extended config options', () => {
      index.devServer({ debug: true, configPath: '/some/path/to/config', webpackConfig: { something: 'extra' } });
      expect(serve).toHaveBeenLastCalledWith({}, { something: 'extra' }, true);
    });

    it('should return the devServer configuration object', () => {
      expect(index.devServer()).toEqual({});
    });
  });

  describe('buildConfig', () => {
    it('should exist', () => {
      expect(index.build).toBeDefined();
    });

    it('should handle extended config options', () => {
      index.build({configPath: '/some/path/to/config', webpackConfig: { something: 'extra' } });
      expect(build).toHaveBeenLastCalledWith({}, { something: 'extra' });
    });

    it('should return the production build configuration object', () => {
      expect(index.build()).toEqual({});
    });
  });
});
