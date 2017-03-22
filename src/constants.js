'use strict';

module.exports = {
  SWANKY_CONFIG: 'swanky.config.yaml',
  WEBPACK_BASE_CONFIG: '../webpack/webpack.config',
  CSS_THEME_FOLDER: 'css',
  CSS_THEME_ENTRY: 'index.styl',
  CSS_SCOPED_NAME: '[name]_[local]__[hash:base64:5]',
  DEV: {
    LABEL: 'development',
    WEBPACK_CONFIG: '../webpack/webpack.dev.config'
  },
  PROD: {
    LABEL: 'production',
    WEBPACK_CONFIG: '../webpack/webpack.prod.config'
  },
  NUNJUCKS_CONFIG: {
    tags: {
      variableStart: '{$',
      variableEnd: '$}'
    },
    autoescape: false
  },
  EXTENSION: {
    MARKDOWN: '.md'
  },
  ENCODING: {
    UTF8: 'utf-8'
  },
  TYPE: {
    CONTENT: 'content'
  },
  REGEX: {
    STYLES: {
      CSS: /\.css$/,
      STYLUS: /\.styl$/,
      LESS: /\.less$/,
      SASS: /\.scss$/
    },
    LANGUAGE: {
      JS: /\.jsx?$/,
      HTML: /\.html$/,
      HTML_TEMPLATE: /\.html$/
    },
    ASSETS: {
      FONTS: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      IMAGES: /\.(png|jpe?g|gif|svg)(\?.*)?$/
    }
  },
  TEMPLATES: {
    RENDER: 'render.html',
    SNIPPET: 'snippet.html',
    CONTENT_WRAPPER: 'content-wrapper.html'
  },
  DEFAULT_SECTION: [
    {
      title: 'No Content',
      content: 'none'
    }
  ],
  SITE_CONFIG: {
    title: 'Swanky Docs',
    src: 'src',
    output: 'docs',
    theme: 'node_modules/swanky-theme',
    snippets: 'snippets',
    layouts: 'templates/layouts',
    partials: 'templates/partials',
    version: '0.0.0'
  }
};
