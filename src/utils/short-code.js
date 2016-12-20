'use strict';

const snippetTypeRegex = /\[(code|render)\s([\w_\/-]+)(\s.*)?]/gi;
const snippetGroupTypeRegex = /\[(code|render)-group](?:\s*)(\[[\s\S]*?])(?:\s*)\[\/\1-group]/gi;
const snippetRegex = /\[([\w_\/-]+)\s*([\s\S]*?)]/gi;
const paramRegex = /([\w_-]+="[^"]+")/gi;

const PLACEHOLDER = 'sWaNkY-md-';  // Swanky snippet placeholder

let shortCode = (testMatches) => {

  let matches = testMatches || []; // testing purposes only

  function getParams(params) {
    let paramsObj = {};

    if (params) {
      params.match(paramRegex).forEach(param => {
        let _paramsArr = param.split('=');

        paramsObj[_paramsArr[0]] = _paramsArr[1].replace(/"(.+)"/g, '$1'); // remove double quotes
      });
    }
    return paramsObj;
  }

  return [
    {
      type: 'lang',
      filter: (text/*, converter, options*/) => {
        return text.replace(snippetTypeRegex, (match, type, template, params) => {
          matches.push(`{$ ${type}('${template}', ${JSON.stringify(getParams(params))}) $}`);
          return PLACEHOLDER + (matches.length - 1) + '!';
        });
      }
    },
    {
      type: 'lang',
      filter: (text/*, converter, options*/) => {
        return text.replace(snippetGroupTypeRegex, (match, type, snippets) => {
          let snippetsArr = [];

          snippets.replace(snippetRegex, (match, template, params) => {
            snippetsArr.push({
              template: template,
              data: getParams(params)
            });
          });
          matches.push(`{$ ${type}(${JSON.stringify(snippetsArr)}) $}`);
          return PLACEHOLDER + (matches.length - 1) + '!';
        });
      }
    },
    {
      type: 'output',
      filter: (text) => {
        for (let i = 0; i < matches.length; i++) {
          let pat = '(<p>)?' + (PLACEHOLDER + i) + '!' + '(.*<\/p>)?';

          text = text.replace(new RegExp(pat, 'gi'), matches[i]);
        }
        matches = [];
        return text;
      }
    }
  ];

};

module.exports = shortCode;
