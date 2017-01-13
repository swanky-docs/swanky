const getLinks = require('./../get-links');

describe('getLinks', () => {
  it('should exist', () => {
    expect(getLinks).toBeDefined();
  });

  describe('getNextPage', () => {

    describe('child pages', () => {
      it('should set next child page', () => {
        const mockPage = {
          key: 'this-page-key',
          parentKey: 'some-parent-key',
          meta: {
            navigation: [
              {
                key: 'some-parent-key',
                children: [
                  {
                    key: 'this-page-key'
                  },
                  {
                    key: 'next-page-key'
                  }
                ]
              }
            ]
          }
        };
        const expectedResult = {
          key: 'next-page-key'
        };

        expect(getLinks.getNextPage(mockPage)).toEqual(expectedResult);
      });

      it('should set next parent page when no more children exist', () => {
        const mockPage = {
          key: 'this-page-key',
          parentKey: 'some-parent-key',
          meta: {
            navigation: [
              {
                key: 'some-parent-key',
                children: [
                  {
                    key: 'this-page-key'
                  }
                ]
              },
              {
                key: 'next-parent-key'
              }
            ]
          }
        };
        const expectedResult = {
          key: 'next-parent-key'
        };

        expect(getLinks.getNextPage(mockPage)).toEqual(expectedResult);
      });

      it('should not set any value if no more pages exist', () => {
        const mockPage = {
          key: 'this-page-key',
          parentKey: 'some-parent-key',
          meta: {
            navigation: [
              {
                key: 'some-parent-key',
                children: [
                  {
                    key: 'this-page-key'
                  }
                ]
              }
            ]
          }
        };
        const expectedResult = null;

        expect(getLinks.getNextPage(mockPage)).toEqual(expectedResult);
      });
    });

    describe('parent pages', () => {
      it('should set next child page if exists', () => {
        const mockPage = {
          key: 'this-page-key',
          parentKey: null,
          meta: {
            navigation: [
              {
                key: 'this-page-key',
                children: [
                  {
                    key: 'next-page-key'
                  }
                ]
              }
            ]
          }
        };
        const expectedResult = {
          key: 'next-page-key'
        };

        expect(getLinks.getNextPage(mockPage)).toEqual(expectedResult);
      });
      it('should set next parent page if no children exist', () => {
        const mockPage = {
          key: 'this-page-key',
          parentKey: null,
          meta: {
            navigation: [
              {
                key: 'this-page-key'
              },
              {
                key: 'next-page-key'
              }
            ]
          }
        };
        const expectedResult = {
          key: 'next-page-key'
        };

        expect(getLinks.getNextPage(mockPage)).toEqual(expectedResult);
      });
      it('should not set next page if none exist', () => {
        const mockPage = {
          key: 'this-page-key',
          parentKey: null,
          meta: {
            navigation: [
              {
                key: 'this-page-key'
              }
            ]
          }
        };
        const expectedResult = null;

        expect(getLinks.getNextPage(mockPage)).toEqual(expectedResult);
      });
    });
  });

  describe('getPreviousPage', () => {

    describe('child pages', () => {
      it('should set previous child page', () => {
        const mockPage = {
          key: 'this-page-key',
          parentKey: 'some-parent-key',
          meta: {
            navigation: [
              {
                key: 'some-parent-key',
                children: [
                  {
                    key: 'previous-page-key'
                  },
                  {
                    key: 'this-page-key'
                  }
                ]
              }
            ]
          }
        };
        const expectedResult = {
          key: 'previous-page-key'
        };

        expect(getLinks.getPreviousPage(mockPage)).toEqual(expectedResult);
      });

      it('should set parent page when no more children exist', () => {
        const mockPage = {
          key: 'this-page-key',
          parentKey: 'some-parent-key',
          meta: {
            navigation: [
              {
                key: 'some-parent-key',
                children: [
                  {
                    key: 'this-page-key'
                  }
                ]
              }
            ]
          }
        };
        const expectedResult = {
          key: 'some-parent-key',
          children: [
            {
              key: 'this-page-key'
            }
          ]
        };

        expect(getLinks.getPreviousPage(mockPage)).toEqual(expectedResult);
      });
    });

    describe('parent pages', () => {
      it('should set previous parent page', () => {
        const mockPage = {
          key: 'this-page-key',
          parentKey: null,
          meta: {
            navigation: [
              {
                key: 'previous-page-key'
              },
              {
                key: 'this-page-key'
              }
            ]
          }
        };
        const expectedResult = {
          key: 'previous-page-key'
        };

        expect(getLinks.getPreviousPage(mockPage)).toEqual(expectedResult);
      });

      it('should not set next page if none exist', () => {
        const mockPage = {
          key: 'this-page-key',
          parentKey: null,
          meta: {
            navigation: [
              {
                key: 'this-page-key'
              }
            ]
          }
        };
        const expectedResult = null;

        expect(getLinks.getPreviousPage(mockPage)).toEqual(expectedResult);
      });
    });
  });
});
