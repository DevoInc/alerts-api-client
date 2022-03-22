import { AlertDefinition } from './alertDefinition';
import { Alert } from './alert';
import { ClientBase } from './base';

/**
 * This class implements the differents classes and methods that call and use the Alerts API.
 */
export class AlertsAPIClient extends ClientBase {
  alert: Alert;
  alertDefinition: AlertDefinition;

  constructor(
    token: string,
    baseUrl: string,
    http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }
  ) {
    super(token, baseUrl, http);
    this.alert = new Alert(this.token, this.baseUrl, this.http);
    this.alertDefinition = new AlertDefinition(
      this.token,
      this.baseUrl,
      this.http
    );
  }
}
