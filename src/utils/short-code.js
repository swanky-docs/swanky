'use strict';

const codeBlockRegex = /(`{3}\s*)(\w+)?/gim;
const snippetTypeRegex = /(?:(?:(?:`{3}\s*)(?:\w+)?(?:\s*)?)?)\[(code|render)\s([\w_\/-]+)(\s.*)?]/gim;
const snippetGroupTypeRegex = /(?:(?:(?:`{3}\s*)(?:\w+)?(?:\s*)?)?)\[(code|render)-group](?:\s*)(\[[\s\S]*?])(?:\s*)\[\/\1-group]/gim;
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
          if (!codeBlockRegex.test(match)) { // Don't match code blocks containing snippet examples
            matches.push(`{$ ${type}('${template}', ${JSON.stringify(getParams(params))}) $}`);
            return PLACEHOLDER + (matches.length - 1) + '!';
          }
          // Do nothing just return the snippet unaltered
          return match;
        });
      }
    },
    {
      type: 'lang',
      filter: (text/*, converter, options*/) => {
        return text.replace(snippetGroupTypeRegex, (match, type, snippets) => {
          let snippetsArr = [];

          if (!codeBlockRegex.test(match)) { // Don't match code blocks containing snippet examples
            snippets.replace(snippetRegex, (match, template, params) => {
              snippetsArr.push({
                template: template,
                data: getParams(params)
              });
            });
            matches.push(`{$ ${type}(${JSON.stringify(snippetsArr)}) $}`);
            return PLACEHOLDER + (matches.length - 1) + '!';
          }

          // Do nothing just return the snippet unaltered
          return match;
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
