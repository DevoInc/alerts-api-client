export class AlertsAPIClientException extends Error {
  message: string;
  status: number;
  response: string;
  headers: { [key: string]: any };

  constructor(
    message: string,
    status: number,
    response: string,
    headers: { [key: string]: any }
  ) {
    super();

    this.message = message;
    this.status = status;
    this.response = response;
    this.headers = headers;
  }
}

/**
 * Returns a AlertsAPIClientException error
 *
 * @param message Error message
 * @param status Status code error
 * @param response Response object
 * @param headers Header request object
 */
export function throwException(
  message: string,
  status: number,
  response: string,
  headers: { [key: string]: any }
): never {
  throw new AlertsAPIClientException(message, status, response, headers);
}
