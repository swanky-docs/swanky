'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

/**
 * Handle loading Swanky Config file
 * @param {String} config - location of Swanky config file relative to the working directory
 * @return {Object} - JSON formatted Swanky configuration
 */
module.exports = (config) => {
  const configPath = path.resolve(process.cwd(), config);

  switch(path.extname(configPath)) {
  case '.json':
    return loadJSONConfig(configPath);
  case '.js':
    return loadJSConfig(configPath);
  default:
    return loadYAMLConfig(configPath);
  }
};

/**
 * Read JS Swanky config file
 * @param {String} configPath - absolute path to Swanky config file
 * @return {Object} - JSON formatted Swanky configuration
 */
function loadJSConfig(configPath) {
  return JSON.parse(JSON.stringify(require(configPath)));
}

/**
 * Read JSON Swanky config file
 * @param {String} configPath - absolute path to Swanky config file
 * @return {Object} - JSON formatted Swanky configuration
 */
function loadJSONConfig(configPath) {
  return JSON.parse(fs.readFileSync(configPath, 'utf8'));
}

/**
 * Read YAML Swanky config file
 * @param {String} configPath - absolute path to Swanky config file
 * @return {Object} - JSON formatted Swanky configuration
 */
function loadYAMLConfig(configPath) {
  try {
    return yaml.safeLoad(fs.readFileSync(configPath, 'utf8'));
  } catch (e) {
    throw new Error('Cannot parse configuration file. Please make sure your Swanky configuration file exists.');
  }
}
