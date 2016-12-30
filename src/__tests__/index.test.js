'use strict';

const index = require('./../index');

jest.mock('./../utils/create-config');
jest.mock('./../config/build/build');
jest.mock('./../config/serve/serve');

describe('index', () => {
  describe('devServer', () => {
    it('should exist', () => {
      expect(index.devServer).toBeDefined();
    });

    it('should return the devServer configuration object', () => {
      expect(index.devServer()).toEqual({});
    });
  });

  describe('buildConfig', () => {
    it('should exist', () => {
      expect(index.build).toBeDefined();
    });

    it('should return the production build configuration object', () => {
      expect(index.build()).toEqual({});
    });
  });
});
