'use strict';

const _ = require('lodash');

function getNextPage(page) {
  let nextPage = null;

  if (page.parentKey) {
    const parentPageObj = _.find(page.meta.navigation, { key: page.parentKey });
    const parentPageIndex = _.findIndex(page.meta.navigation, { key: page.parentKey });
    const currentPageIndex = _.findIndex(parentPageObj.children, { key: page.key });

    // Add next page
    if (currentPageIndex < parentPageObj.children.length - 1) {
      nextPage = parentPageObj.children[currentPageIndex + 1];
    } else {
      if (parentPageIndex < page.meta.navigation.length - 1) {
        nextPage = page.meta.navigation[parentPageIndex + 1];
      }
    }

  } else {
    // Handle parent page
    const currentPageObj = _.find(page.meta.navigation, { key: page.key });
    const currentPageIndex = _.findIndex(page.meta.navigation, { key: page.key });

    // Add next page
    if (currentPageObj.children) {
      nextPage = currentPageObj.children[0];
    } else {
      if (currentPageIndex < page.meta.navigation.length - 1) {
        nextPage = page.meta.navigation[currentPageIndex + 1];
      }
    }
  }

  return nextPage;
}

function getPreviousPage(page) {
  let previousPage = null;

  if (page.parentKey) {
    const parentPageObj = _.find(page.meta.navigation, { key: page.parentKey });
    const currentPageIndex = _.findIndex(parentPageObj.children, { key: page.key });

    // Add previous page
    if (currentPageIndex > 0) {
      previousPage = parentPageObj.children[currentPageIndex - 1];
    } else {
      previousPage = parentPageObj;
    }
  } else {
    // Handle parent page
    const currentPageIndex = _.findIndex(page.meta.navigation, { key: page.key });

    // Add previous page
    if (currentPageIndex > 0) {
      previousPage = page.meta.navigation[currentPageIndex - 1];
    }
  }

  return previousPage;
}

module.exports = {
  getNextPage: getNextPage,
  getPreviousPage: getPreviousPage
};