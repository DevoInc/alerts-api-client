import { AlertFilter, AlertDefinitionObject, Status } from '../common';
import { objectToQueryString } from '../common/util';
import { ClientBase } from './base';

/**
 * This class contains the methods related to the alerts that have been triggered.
 *
 * Only the following endpoints of the Alerts API have been managed:
 * - v1/alerts/list
 * - v1/alerts/updateStatus
 * - v1/alerts/updateStatusList
 *
 */
export class Alert extends ClientBase {
  constructor(
    token: string,
    baseUrl: string,
    http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }
  ) {
    super(token, baseUrl, http);
  }

  /**
   * Get triggered alerts list without context.
   *
   * The values for the filters object param are:
   *
   * - _from_ (string): Mandatory. The date from in epoch time, with milliseconds).
   * - _limit_ (string): Mandatory. The limit, max number of elements returned.
   * - _offset_ (string): Mandatory. The offset, start element in the element number.
   * - _orderby_ (string): Field to order, must be one of: _id_, _domain_, _priority_, _context_, _category_, _srcPort_, _srcIp_, _srcHost_, _dstIp_, _dstPort_, _dstHost_, _protocol_, _username_, _application_, _engine_, _extraData_, _status_, _ack_status_date_, _createDate_, _updateDate_.
   * - _orderasc_ (boolean): Order Ascending.
   * - _showAll_ (boolean): Obtain all _(false positive and close status included)_. Default: _false_.
   * - _to_ (string): Mandatory. The date to in epoch time, with milliseconds).
   *                                                                                                                                                                                                                         |
   * @param filters JSON object with the filters values.
   *
   * @example Basic
   *
   * .
   *
   * ```ts
   * import { Alert } from '@devoinc/alerts-api-client';
   *
   * const url = 'https://api-us.devo.com/alerts';
   * const token = 'my-token-is-this';
   * const filters = {
   *   from: '1647302400000',
   *   to: '1647427211005',
   *   limit: '100',
   *  offset: '0',
   * };
   *
   * const alert = new Alert(token, url);
   * const alerts = await alert.get(filters);
   * ```
   */
  get(filters: AlertFilter): Promise<AlertDefinitionObject[]> {
    const url_: string =
      this.baseUrl + '/v1/alerts/list?' + objectToQueryString(filters);
    const options_: RequestInit = this.getOptionsRequest(this.token, 'GET');

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        const customMessages = {
          400: 'Alerts API error.',
          default: 'An unexpected server error occurred.',
        };
        return this.proccessResponse(_response, customMessages);
      });
  }

  /**
   * Update the status of an alert or a list of alerts.
   *
   * The list of states is:
   *
   * - _UNREAD_        0
   * - _UPDATED_       1
   * - _FALSE POSTIVE_ 2
   * - _WATCHED_       100
   * - _CLOSED_        300
   * - _REMINDER_      500
   * - _RECOVERY_      600
   * - _ANTI FLOOD_    700
   *
   * @param ids Simple string alert identification or list of alerts indentification
   * @param status New status number
   * @returns
   *
   * @example Basic
   *
   * .
   *
   * **Update an alert**
   *
   * ```ts
   * import { Alert } from '@devoinc/alerts-api-client';
   *
   * const url = 'https://api-us.devo.com/alerts';
   * const token = 'my-token-is-this';
   * const alertID = '123';
   * const newState = 300;
   *
   * const alert = new Alert(token, url);
   * const result = await alert.updateStatus(alertID, newState);
   * ```
   *
   * **Update a list of alerts**
   *
   * ```ts
   * import { Alert } from '@devoinc/alerts-api-client';
   *
   * const url = 'https://api-us.devo.com/alerts';
   * const token = 'my-token-is-this';
   * const alertsID = ['123', '234'];
   * const newState = 300;
   *
   * const alert = new Alert(token, url);
   * const result = await alert.updateStatus(alertsID, newState);
   * ```
   */
  updateStatus(ids: string | string[], status: Status): Promise<void> {
    let url_: string, options_: RequestInit;
    if (typeof ids === 'string') {
      url_ = this.baseUrl + '/v1/alerts/updateStatus?';
      url_ += objectToQueryString({ id: ids, status });
      options_ = this.getOptionsRequest(this.token, 'PUT');
    } else {
      url_ = this.baseUrl + '/v1/alerts/updateStatusList?';
      url_ += objectToQueryString({ status });
      options_ = this.getOptionsRequest(this.token, 'PUT', ids);
    }

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        const customMessages = {
          400: 'Alerts not exists with this id.',
          500: 'Server error and java exception.',
          default: 'An unexpected server error occurred.',
        };
        return this.proccessResponse(_response, customMessages);
      });
  }
}
