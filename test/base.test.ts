import 'isomorphic-fetch';

import { ClientBase } from '../src/client/base';
import { AlertsAPIClientException } from '../src/common/errors';

const token = 'my-token';
const url = 'https://api-us.devo.com/alerts';

const body = '{"hello":"world"}';
const responseObj = (status = 200, body = '') => {
  const response: Response = new Response(body, {
    status,
    statusText: '',
  });
  return response;
};
const messages = {
  400: 'Bad :(',
  default: 'Bad :/',
};

const cases = [
  ['Status 200', 200, body],
  ['Status 204', 204, body],
  ['Error', 400, body],
];

describe('Base alert API client metods', () => {
  it.each(cases)('%s', async (_title, _status, _body) => {
    const response: Response = responseObj(_status as number, _body as string);
    const client: ClientBase = new ClientBase(token, url);
    const clientObj = Object.getPrototypeOf(client);

    try {
      const result = await clientObj.proccessResponse(response, messages);
      expect(JSON.stringify(result)).toBe(body);
    } catch (error) {
      expect(error).toBeInstanceOf(AlertsAPIClientException);
    }
  });

  test('getOptionsRequest: default header', async () => {
    const client: ClientBase = new ClientBase(token, url);
    const clientObj = Object.getPrototypeOf(client);

    const options = clientObj.getOptionsRequest('my-token', 'GET');

    expect(options).toEqual({
      body: null,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        standAloneToken: 'my-token',
        'Content-Type': 'application/json',
      },
    });
  });

  test('getOptionsRequest: default header, custom body', async () => {
    const client: ClientBase = new ClientBase(token, url);
    const clientObj = Object.getPrototypeOf(client);

    const options = clientObj.getOptionsRequest('my-token', 'GET', {
      hola: 'hi',
    });

    expect(options).toEqual({
      body: '{"hola":"hi"}',
      method: 'GET',
      headers: {
        Accept: 'application/json',
        standAloneToken: 'my-token',
        'Content-Type': 'application/json',
      },
    });
  });

  test('getOptionsRequest: custom header', async () => {
    const client: ClientBase = new ClientBase(token, url);
    const clientObj = Object.getPrototypeOf(client);

    const options = clientObj.getOptionsRequest(
      'my-token',
      'GET',
      null,
      'text/html'
    );

    expect(options).toEqual({
      body: null,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        standAloneToken: 'my-token',
        'Content-Type': 'text/html',
      },
    });
  });

  test('transformOptions', async () => {
    const client: ClientBase = new ClientBase(token, url);
    const clientObj = Object.getPrototypeOf(client);

    const options: RequestInit = {
      body: null,
      method: 'GET',
      headers: {
        standAloneToken: 'token',
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
    const response = await clientObj.transformOptions(options);
    expect(response).toEqual(options);
  });
});
