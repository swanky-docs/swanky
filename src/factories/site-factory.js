'use strict';

const _ = require('lodash');
const path = require('path');
const fs = require('fs');
const basePath = process.cwd();
const getKey = require('./../utils/get-key');
const DEFAULTS = require('./../constants');

const DEFAULT_SITE_CONFIG = {
  title: 'Swanky Docs',
  src: 'docs',
  output: 'build',
  snippets: 'snippets',
  layouts: 'templates/layouts',
  partials: 'templates/partials',
  version: '0.0.0'
};

/**
 * Site Factory
 * @param {object} config - Swanky configuration
 * @return {object} - site configuration object
 */
function siteFactory(config) {
  if (!config) {
    throw new Error('Missing Swanky config.');
  }

  if (!config.theme) {
    throw new Error('Missing "theme" property. "theme" MUST be specified in Swanky config.');
  }

  return {
    title: config.title || DEFAULT_SITE_CONFIG.title,
    src: getSourcePath(config.src),
    output: path.join(basePath, config.output || DEFAULT_SITE_CONFIG.output),
    navigation: getSiteNavigation(config.sections),
    theme: getThemePath(config.theme),
    layouts: getLayouts(config.theme, config.layouts),
    partials: getPartials(config.theme, config.partials),
    snippets: getSnippets(config.src, config.snippets),
    renderTemplate: getRenderTemplate(config.theme, config.partials),
    snippetTemplate: getSnippetTemplate(config.theme, config.partials),
    contentWrapperTemplate: getContentWrapperTemplate(config.theme, config.partials),
    fileDependencies: [],
    repository: config.repo || null,
    production: false,
    serverPath: getServerPath(config.serverPath),
    version: config.version || DEFAULT_SITE_CONFIG.version
  };
}

/**
 * Build site navigation
 * @param {Object} sections - site pages
 * @returns {Object} navigation - normalized site navigation
 */
const getSiteNavigation = (sections) => {
  const _sections = sections && sections.length ? sections : DEFAULTS.DEFAULT_SECTION;

  return _sections.map((page, index) => {
    const pageKey = getKey(page.title);

    // Top level
    let section = {
      key: pageKey,
      title: page.title,
      url: index !== 0 ? `${_.kebabCase(page.title)}.html` : 'index.html'
    };

    // Second level
    if (page.subSections) {
      section.children = page.subSections.map((childPage) => {
        const childPageKey = getKey(childPage.title, page.title);

        return {
          key: childPageKey,
          title: childPage.title,
          url: `${_.kebabCase(page.title)}/${_.kebabCase(childPage.title)}.html`
        };
      });
    }

    return section;
  });
};

const getSourcePath = (src) => {
  return src ? path.join(basePath, src) : path.join(basePath, DEFAULT_SITE_CONFIG.src);
};

const getThemePath = (theme) => {
  return path.join(basePath, theme);
};

const getServerPath = (serverPath) => {
  return serverPath ? `/${serverPath}/` : '/';
};

const getLayouts = (theme, layouts) => {
  return layouts ? path.join(basePath, layouts) : path.join(getThemePath(theme), DEFAULT_SITE_CONFIG.layouts);
};

const getRenderTemplate = (theme, partials) => {
  return fs.readFileSync(path.join(getPartials(theme, partials), DEFAULTS.TEMPLATES.RENDER), DEFAULTS.ENCODING.UTF8);
};

const getSnippetTemplate = (theme, partials) => {
  return fs.readFileSync(path.join(getPartials(theme, partials), DEFAULTS.TEMPLATES.SNIPPET), DEFAULTS.ENCODING.UTF8);
};

const getContentWrapperTemplate = (theme, partials) => {
  return fs.readFileSync(path.join(getPartials(theme, partials), DEFAULTS.TEMPLATES.CONTENT_WRAPPER), DEFAULTS.ENCODING.UTF8);
};

const getPartials = (theme, partials) => {
  return partials ? path.join(basePath, partials) : path.join(getThemePath(theme), DEFAULT_SITE_CONFIG.partials);
};

const getSnippets = (src, snippets) => {
  return snippets ? path.join(basePath, snippets) : path.join(getSourcePath(src), DEFAULT_SITE_CONFIG.snippets);
};

module.exports = siteFactory;
