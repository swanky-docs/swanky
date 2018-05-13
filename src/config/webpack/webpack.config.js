'use strict';

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const getSectionsConfig = require('./../../utils/get-sections-config');
const DEFAULTS = require('./../../constants.js');

module.exports = (CONFIG, SWANKY_CONFIG) => {
  const BASE_PATH = process.cwd();
  const SECTIONS_CONFIG = getSectionsConfig(
    SWANKY_CONFIG.sections,
    SWANKY_CONFIG.meta
  );
  const THEME_PATH = `${SWANKY_CONFIG.meta.theme}.*index.styl`.replace(
    /\\/g,
    '\\\\'
  );
  const THEME_REGEX = new RegExp(THEME_PATH);

  const WEBPACK_CONFIG = {
    devtool: CONFIG.devtool,
    context: BASE_PATH,
    entry: {
      theme: [SWANKY_CONFIG.meta.theme + '/index.js']
    },
    output: {
      path: SWANKY_CONFIG.meta.output,
      filename: '[name].[hash:8].bundle.js',
      publicPath: SWANKY_CONFIG.meta.production
        ? SWANKY_CONFIG.meta.serverPath
        : '/'
    },
    resolve: {
      extensions: ['.js', '.json', '.styl', '.less', '.scss'],
      descriptionFiles: ['package.json'],
      modules: [BASE_PATH, 'node_modules', 'src/loaders'],
      mainFiles: ['index'],
      alias: {
        assets: path.resolve(BASE_PATH, SWANKY_CONFIG.meta.src, 'assets')
      }
    },
    resolveLoader: {
      alias: {
        'swanky-docs-loader': path.join(
          __dirname,
          './../../loaders/swanky-docs-loader'
        )
      }
    },

    module: {
      rules: [
        {
          // "oneOf" will traverse all following loaders until one will
          // match the requirements. When no loader matches it will fall
          // back to the "file" loader at the end of the loader list.
          oneOf: [
            {
              test: DEFAULTS.REGEX.STYLES.CSS,
              use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader'
              })
            },
            {
              test: DEFAULTS.REGEX.STYLES.LESS,
              use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                  {
                    loader: require.resolve('css-loader')
                  },
                  {
                    loader: require.resolve('less-loader')
                  }
                ]
              })
            },
            {
              test: DEFAULTS.REGEX.STYLES.SASS,
              use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                  {
                    loader: require.resolve('css-loader')
                  },
                  {
                    loader: require.resolve('sass-loader')
                  }
                ]
              })
            },
            {
              test: THEME_REGEX,
              use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                  {
                    loader: require.resolve('css-loader'),
                    query: {
                      importLoaders: 1,
                      modules: true,
                      localIdentName: SWANKY_CONFIG.meta.cssScopedName
                    }
                  },
                  {
                    loader: require.resolve('stylus-loader')
                  }
                ]
              })
            },
            {
              test: DEFAULTS.REGEX.STYLES.STYLUS,
              exclude: THEME_REGEX,
              use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                  {
                    loader: require.resolve('css-loader')
                  },
                  {
                    loader: require.resolve('stylus-loader')
                  }
                ]
              })
            },
            {
              test: DEFAULTS.REGEX.LANGUAGE.JS,
              exclude: /node_modules/,
              use: [
                {
                  loader: require.resolve('babel-loader'),
                  options: {
                    cacheDirectory: false,
                    presets: ['@babel/preset-env'].map(require.resolve)
                  }
                }
              ]
            },
            {
              test: DEFAULTS.REGEX.LANGUAGE.HTML,
              use: require.resolve('html-loader')
            },
            {
              test: DEFAULTS.REGEX.ASSETS.FONTS,
              use: [
                {
                  loader: require.resolve('url-loader'),
                  query: {
                    limit: 10000,
                    name: 'assets/fonts/[name].[hash:7].[ext]'
                  }
                }
              ]
            },
            {
              test: DEFAULTS.REGEX.ASSETS.IMAGES,
              use: [
                {
                  loader: require.resolve('url-loader'),
                  query: {
                    limit: 10000,
                    name: 'assets/img/[name].[hash:7].[ext]'
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin({
        filename: '[name].[hash:8].css',
        disable: false,
        allChunks: true,
        publicPath: BASE_PATH
      }),
      new webpack.LoaderOptionsPlugin({
        options: {
          context: path.resolve(
            path.join(SWANKY_CONFIG.meta.theme, DEFAULTS.CSS_THEME_FOLDER)
          ),
          swankyDocs: {
            sections: SECTIONS_CONFIG
          }
        }
      })
    ]
  };

  const docsScriptPath = path.join(SWANKY_CONFIG.meta.src, '/docs.js');

  if (fs.existsSync(docsScriptPath)) {
    WEBPACK_CONFIG.entry.docs = [docsScriptPath];
  }

  // Snippets
  // Make sure we have a folder as well
  if (fs.existsSync(SWANKY_CONFIG.meta.snippets)) {
    // Add an entry point to bootstrap snippets
    const loader = require.resolve('./../../loaders/bootstrap-loader');
    const template = path.join(
      __dirname,
      './../../loaders/bootstrap-loader/bootstrap-loader-template.js'
    );

    WEBPACK_CONFIG.entry['snippets'] = `${loader}?src=${
      SWANKY_CONFIG.meta.snippets
    }!${template}`;
  }

  SECTIONS_CONFIG.forEach((page, index) => {
    const htmlConfig = {
      key: page.key,
      chunks: ['theme'],
      filename: !index ? 'index.html' : page.url,
      template:
        'html-loader!swanky-docs-loader?key=' + page.key + '!' + page.layoutSrc,
      inject: true
    };

    const faviconPath = path.join(SWANKY_CONFIG.meta.src, 'favicon.ico');

    if (fs.existsSync(faviconPath)) {
      htmlConfig.favicon = faviconPath;
    }

    // Only add docs main script file if it exists
    if (WEBPACK_CONFIG.entry.docs) {
      htmlConfig.chunks.push('docs');
    }

    if (WEBPACK_CONFIG.entry.snippets) {
      htmlConfig.chunks.push('snippets');
    }

    // Create dynamic entry points for page specific scripts
    if (page.bootstrap && page.bootstrap.length > 0) {
      WEBPACK_CONFIG.entry[page.key] = page.bootstrap;
      htmlConfig.chunks.push(page.key);
    }

    // Create an instance of the HTML Webpack Plugin for each page
    WEBPACK_CONFIG.plugins = WEBPACK_CONFIG.plugins.concat(
      new HtmlWebpackPlugin(htmlConfig)
    );
  });

  // Plugins
  CONFIG.plugins.forEach(plugin => {
    WEBPACK_CONFIG.plugins.push(plugin);
  });

  return WEBPACK_CONFIG;
};
