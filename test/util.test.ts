import { arrayToQueryString, objectToQueryString } from '../src/common/util';

describe('Utils functions test', () => {
  test('objectToQueryString', () => {
    const value = objectToQueryString({ mir: 'ltq', 212: 've' });
    expect(value).toBe('212=ve&mir=ltq');
  });

  test('arrayToQueryString', () => {
    const value = arrayToQueryString(['ccs', 'ltq', 'val'], 've');
    expect(value).toBe('ve=ccs&ve=ltq&ve=val');
  });
});
