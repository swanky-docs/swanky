'use strict';

const index = require('./../index');

jest.mock('./../utils/create-config');
jest.mock('./../config/build/build');
jest.mock('./../config/serve/serve');

const serve = require('./../config/serve/serve');
const build = require('./../config/build/build');

describe('index', () => {
  const identityFn = (x) => x;

  describe('devServer', () => {

    it('should have sensible defaults', () => {
      // Allow the mock function to execute the default mutator function, which is an identity function (returns whatever you pass to it)
      serve.mockImplementationOnce((swankyConfig, loaders, isDebugMode, webpackConfigMutatorFn) => webpackConfigMutatorFn('foo'));
      let result = index.devServer();

      expect(serve.mock.calls[0][0]).toEqual({});
      expect(serve.mock.calls[0][1]).toEqual([]);     // loaders
      expect(serve.mock.calls[0][2]).toEqual(false);  // debug mode
      expect(result).toEqual('foo');
    });

    it('should handle debug mode', () => {
      let loaders = [{}];
      let debug = true;

      index.devServer({ debug, loaders, configFn: identityFn });
      expect(serve).toHaveBeenLastCalledWith({}, loaders, debug, identityFn);
    });

    it('should handle extended config options', () => {
      let loaders = [{}];
      let configFn = identityFn;
      let debug = true;

      index.devServer({ configPath: '/some/path/to/config', debug, loaders, configFn });
      expect(serve).toHaveBeenLastCalledWith({}, loaders, debug, configFn);
    });

    it('should return the devServer configuration object', () => {
      expect(index.devServer()).toEqual({});
    });
  });


  describe('buildConfig', () => {

    it('should have sensible defaults', () => {
      // Allow the mock function to execute the default mutator function, which is an identity function (returns whatever you pass to it)
      build.mockImplementationOnce((swankyConfig, loaders, webpackConfigMutatorFn) => webpackConfigMutatorFn('foo'));
      let result = index.build();

      expect(build.mock.calls[0][0]).toEqual({});
      expect(build.mock.calls[0][1]).toEqual([]);     // loaders
      expect(result).toEqual('foo');
    });


    it('should handle extended config options', () => {
      let loaders = [{}];
      let configFn = identityFn;

      index.build({ configPath: '/some/path/to/config', loaders, configFn});
      expect(build).toHaveBeenLastCalledWith({}, loaders, configFn);
    });

    it('should return the production build configuration object', () => {
      expect(index.build()).toEqual({});
    });
  });
});
