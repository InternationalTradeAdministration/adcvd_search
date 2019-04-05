import { expect } from 'chai';

import { defineAPI, resetUniqueIds } from '../../src/js/apis/utils';

describe('apis/utils', () => {
  describe('#defineAPI', () => {
    
    afterEach(() => {
      resetUniqueIds();
    });
    
    const endpoint = 'http://www.example.com';
   
    it('should create a new API object', () => {
      const api = defineAPI('example', { endpoint });

      expect(api.example.async).to.eq(false);
      expect(api.example.bucket.enable).to.eq(true);
      expect(api.example.card.enable).to.eq(true);
      expect(api.example.displayName).to.eq('Example');
      expect(api.example.endpoint).to.eq('http://www.example.com');
      expect(api.example.pathname).to.eq('example');
      expect(api.example.permittedParams).to.eql(['q']);
      expect(api.example.uniqueId).to.eq('example');
      expect(api.example.result.enable).to.eq(true);
      expect(api.example.isValidQuery("ok")).to.eq(true);
    });

    it('should create a new API object with overridden attributes', () => {
      const customAttributes = {
        endpoint,
        async: true,
        aggregations: { countries: { type: 'array' }, industries: { type: 'tree' } },
        bucket: {
          enable: false
        },
        card: {
          enable: false
        },
        displayName: 'Excellent',
        pathname: 'excellent',
        permittedParams: ['o'],
        requiredParams: ['o'],
        shortName: 'Excel',
        transformParams: (params) => params,
        transformResponse: (response) => response,
        uniqueId: 'excellent'
      };
      const api = defineAPI('example', customAttributes);

      expect(api.example.aggregations.countries.type).to.eq('array');
      expect(api.example.aggregations.industries.type).to.eq('tree');
      expect(api.example.async).to.eq(true);
      expect(api.example.bucket.enable).to.eq(false);
      expect(api.example.card.enable).to.eq(false);
      expect(api.example.displayName).to.eq('Excellent');
      expect(api.example.endpoint).to.eq('http://www.example.com');
      expect(api.example.pathname).to.eq('excellent');
      expect(api.example.permittedParams).to.eql(['o']);
      expect(api.example.requiredParams).to.eql(['o']);
      expect(api.example.uniqueId).to.eq('excellent');
      expect(api.example.result.enable).to.eq(true);
      expect(api.example.isValidQuery()).to.eq(false);
    });

    it('should throw error when invalid attribute type is provided', () => {
      const fn = () => defineAPI('example', { aggregations: 1234 });
      expect(fn).to.throw(Error, /Invalid/);
    });

    it('should throw error when required attributes are missing', () => {
      const fn = () => defineAPI('example', {});
      expect(fn).to.throw(Error, /Required/);
    });

    it('should throw error when APIs with identical id is provided', () => {
      defineAPI('example', { endpoint });
      const fn = () => defineAPI('example', { endpoint });
      expect(fn).to.throw(Error, /Duplicated API found: /);
    });
  });
});
