import { AlertDefinitionObject, OptionRequestObject } from '../common';
import { throwException } from '../common/errors';

export class ClientBase {
  token: string;
  http: {
    fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
  };
  baseUrl: string;

  /**
   * Create a prepare the instance to call the Alerts API.
   * @param token Devo authentication token.
   * @param baseUrl Devo cloud platform endpoint.
   * @param http Custom http function.
   */
  constructor(
    token: string,
    baseUrl: string,
    http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }
  ) {
    this.token = token;
    this.http = http ? http : (window as any);
    this.baseUrl = baseUrl;
  }

  protected transformOptions(options: RequestInit): Promise<RequestInit> {
    return Promise.resolve(options);
  }

  /**
   * Proccess a Response of a Request returning the content in case of success
   * @param response Response object
   * @param messages Custom error object
   * @returns
   */
  protected proccessResponse(
    response: Response,
    messages: { [name: string]: string; default: string }
  ): Promise<void> | any {
    const status: number = response.status;

    if ([200, 204].includes(status)) {
      return response.text().then((_responseText) => {
        return _responseText === ''
          ? null
          : (JSON.parse(_responseText) as AlertDefinitionObject[]);
      });
    }

    const statusMessages =
      status in messages ? messages[status] : messages.default;

    return response.text().then((_responseText) => {
      throwException(statusMessages, status, _responseText, response.headers);
    });
  }

  /**
   * Generate the options request
   * @param token Devo token
   * @param method Request method
   * @param body Request body
   * @param contentType Request header content type
   * @param accept Request header accept
   * @returns
   */
  protected getOptionsRequest(
    token: string,
    method: 'PUT' | 'GET' | 'POST' | 'DELETE',
    body: object | string | null = null,
    contentType = 'application/json',
    accept = 'application/json'
  ): OptionRequestObject {
    return {
      body: body ? JSON.stringify(body) : null,
      method,
      headers: {
        standAloneToken: token,
        'Content-Type': contentType,
        Accept: accept,
      },
    };
  }
}
