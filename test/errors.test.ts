import { throwException, AlertsAPIClientException } from '../src/common/errors';

describe('Errors functions test', () => {
  test('throwException', () => {
    const error = () => {
      throwException('Error testing', 400, '{"error":"exit"}', {});
    };
    expect(error).toThrow(AlertsAPIClientException);
  });
});
