'use strict';

const siteFactory = require('./../factories/site-factory');
const fs = require('fs');
const glob = require('glob');

module.exports = (config) => {
  const siteMetadata = siteFactory(config);
  const assetFolders = [siteMetadata.layouts, siteMetadata.partials, siteMetadata.snippets];

  assetFolders.forEach((folderPath) => {
    let fileNames;

    if (fs.existsSync(folderPath)) {
      let pattern = `${folderPath}/**/*.*`;

      fileNames = glob.sync(pattern);
    }

    if (fileNames) {
      fileNames.forEach(fileName => siteMetadata.fileDependencies.push(fileName));
    }
  });

  return siteMetadata;
};
