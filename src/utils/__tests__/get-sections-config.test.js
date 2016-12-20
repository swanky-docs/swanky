const getSectionsConfig = require('../get-sections-config');

jest.mock('./../../factories/page-factory');
const pageFactory = require('./../../factories/page-factory');

describe('getSectionsConfig', () => {
  it('should exist', () => {
    expect(getSectionsConfig).toBeDefined();
  });

  it('should flatten sub sections into single array', () => {
    const sections = [
      {
        title: 'Foundaton'
      },
      {
        title: 'Components',
        subSections: [
          {
            title: 'Cards'
          },
          {
            title: 'Buttons'
          }
        ]
      }
    ];
    const siteMeta = {};
    const sectionsConfig = getSectionsConfig(sections, siteMeta);

    expect(sectionsConfig.length).toBe(4);
  });

  it('should return a default section if no sections are provided', () => {
    const sections = [];
    const siteMeta = {};

    // Mock pageFactory response
    pageFactory.__setMockResponse({
      key: 'no-content',
      title: 'No Content',
      filename: 'no-content.html',
      url: 'no-content.html',
      content: 'none'
    });

    const sectionsConfig = getSectionsConfig(sections, siteMeta);

    expect(sectionsConfig[0].filename).toEqual('no-content.html');
  });
});
