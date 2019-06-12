import { expect } from 'chai';

import { parseAsArray, parseAsTree } from '../../src/js/utils/aggregation-parser';

describe('aggregation-parser', () => {
  const records = [
    { key: '/Aerospace and Defense', doc_count: 1 },
    { key: '/Aerospace and Defense/Aviation', doc_count: 1 },
    { key: '/Aerospace and Defense/Aviation/Aircraft and Aircraft Parts', doc_count: 1 }
  ];

  describe('#parseAsArray', () => {
    it('returns records as keys in an object', () => {
      const result = parseAsArray(records);
      expect(result["/Aerospace and Defense"]).to.exist
      expect(result["/Aerospace and Defense/Aviation"]).to.exist
      expect(result["/Aerospace and Defense/Aviation/Aircraft and Aircraft Parts"]).to.exist
    });
  });

  describe('#parseAsTree', () => {
    it('split by "/" and return structure all elements as a tree', () => {
      expect(parseAsTree(records)).to.eql({
        'Aerospace and Defense': {
          Aviation: {
            'Aircraft and Aircraft Parts': {}
          }
        }
      });
    });
  });
});
