import {
  AlertDefinitionFilter,
  AlertDefinitionObject,
  defaultAlertDefFilter,
} from '../common';
import { objectToQueryString, arrayToQueryString } from '../common/util';
import { ClientBase } from './base';

/**
 * This class contains the methods related to the definitions of previously defined alerts or to create new ones.
 *
 * Only the following endpoints of the Alerts API have been managed:
 * - v1/alertDefinitions
 * - v1/alertDefinitions/status
 * - v1/alertDefinitions/batch
 *
 */
export class AlertDefinition extends ClientBase {
  constructor(
    token: string,
    baseUrl: string,
    http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }
  ) {
    super(token, baseUrl, http);
  }
  /**
   * List the alerts definitions previously created.
   * The full list of attributes for the _filters_ param is available at {@link https://docs.devo.com}.
   *
   * @see The official documentation {@link https://docs.devo.com/confluence/ndt/latest/api-reference/alerting-api/working-with-alert-definitions#id-.Workingwithalertdefinitionsvv7.3.0-Listallyouralertdefinitions|here}.
   *
   * @param filters filters
   *
   * @example Basic
   *
   * .
   *
   * **List alerts definition with default values**
   *
   * ```ts
   * import { AlertDefinition } from '@devoinc/alerts-api-client';
   *
   * const url = 'https://api-us.devo.com/alerts';
   * const token = 'my-token-is-this';
   *
   * const alertDefinition = new AlertDefinition(token, url);
   * const alerts = await alertDefinition.get();
   * ```
   *
   * **List filtered alerts definition**
   *
   * ```ts
   * import { AlertDefinition } from '@devoinc/alerts-api-client';
   *
   * const url = 'https://api-us.devo.com/alerts';
   * const token = 'my-token-is-this';
   * const filters = {
   *   nameFilter: 'test',
   * };
   *
   * const alertDefinition = new AlertDefinition(token, url);
   * const alerts = await alertDefinition.get(filters);
   * ```
   *
   */
  get(
    filters: AlertDefinitionFilter = defaultAlertDefFilter
  ): Promise<AlertDefinition[]> {
    const url_: string =
      this.baseUrl + '/v1/alertDefinitions?' + objectToQueryString(filters);

    const options_: RequestInit = this.getOptionsRequest(this.token, 'GET');

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        const customMessages = {
          400: 'Alerts definition error.',
          default: 'An unexpected server error occurred.',
        };
        return this.proccessResponse(_response, customMessages);
      });
  }

  /**
   * Update an alert definition or a list of alerts definitions.
   * The full list of attributes for the _alertDefinition_ param is available at {@link https://docs.devo.com}.
   *
   * @see See the official documentation {@link https://docs.devo.com/confluence/ndt/latest/api-reference/alerting-api/working-with-alert-definitions#id-.Workingwithalertdefinitionsvv7.3.0-updateUpdateanalertdefinition|here}.
   * @param alertDefinition  Values of the alert definition to be updated.
   *
   * @example Basic
   *
   * .
   *
   * **Update an alert definition**
   *
   * ```ts
   * import { AlertDefinition } from '@devoinc/alerts-api-client';
   *
   * const url = 'https://api-us.devo.com/alerts';
   * const token = 'my-token-is-this';
   * const alertDef: AlertDefinitionObject = {
   *   id: '173025',
   *   name: 'Test Alert Definition',
   *   description: 'Just a description',
   *   subcategory: 'APIClientTest',
   *   alertCorrelationContext: {
   *     querySourceCode:
   *       'from test.keep.free group every 3h select count() as c where c > 10',
   *     priority: 2,
   *     correlationTrigger: {
   *       kind: 'each',
   *     },
   *   },
   * };
   *
   * const alertDefinition = new AlertDefinition(token, url);
   * const result = await alertDefinition.update(alertDef);
   * ```
   *
   */
  update(
    alertDefinition: AlertDefinitionObject | AlertDefinitionObject[]
  ): Promise<void> {
    let url_: string = this.baseUrl + '/v1/alertDefinitions';
    url_ += Array.isArray(alertDefinition) ? '/batch' : '';
    const options_: RequestInit = this.getOptionsRequest(
      this.token,
      'PUT',
      alertDefinition
    );

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        const customMessages = {
          400: 'Alerts API error.',
          500: 'Server error and java exception.',
          default: 'An unexpected server error occurred.',
        };
        return this.proccessResponse(_response, customMessages);
      });
  }

  /**
   * Create a new alert definition.
   * The full list of attributes for the _alertDefinition_ param is available at {@link https://docs.devo.com}.
   *
   * @see See the official documentation {@link https://docs.devo.com/confluence/ndt/latest/api-reference/alerting-api/working-with-alert-definitions#id-.Workingwithalertdefinitionsvv7.3.0-createalert|here}.
   *
   * @param alertDefinition  Values of the alert definition to be created.
   *
   * @example Basic
   *
   * .
   *
   * ```ts
   * import { AlertDefinition } from '@devoinc/alerts-api-client';
   *
   * const url = 'https://api-us.devo.com/alerts';
   * const token = 'my-token-is-this';
   * const alertDef: AlertDefinitionObject = {
   *   name: 'New alert definition',
   *   description: 'Just a description',
   *   subcategory: 'APIClientTest',
   *   alertCorrelationContext: {
   *     querySourceCode:
   *       'from test.keep.free group every 3h select count() as c where c > 10',
   *     priority: 2,
   *     correlationTrigger: {
   *       kind: 'each',
   *     },
   *   },
   * };
   *
   * const alertDefinition = new AlertDefinition(token, url);
   * const result = await alertDefinition.create(alertDef);
   * ```
   */
  create(alertDefinition: AlertDefinitionObject): Promise<void> {
    const url_: string = this.baseUrl + '/v1/alertDefinitions';
    const options_: RequestInit = this.getOptionsRequest(
      this.token,
      'POST',
      alertDefinition
    );

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        const customMessages = {
          400: 'Alerts API error.',
          500: 'Server error and java exception.',
          default: 'An unexpected server error occurred.',
        };
        return this.proccessResponse(_response, customMessages);
      });
  }

  /**
   * Delete a list of alert definition.
   *
   * @see See the official documentation {@link https://docs.devo.com/confluence/ndt/latest/api-reference/alerting-api/working-with-alert-definitions#id-.Workingwithalertdefinitionsvv7.3.0-Deletealertdefinitionsinbulk|here}.
   *
   * @param alertIds List of alert definitions IDs
   *
   * @example Basic
   *
   * .
   *
   * ```ts
   * import { AlertDefinition } from '@devoinc/alerts-api-client';
   *
   * const url = 'https://api-us.devo.com/alerts';
   * const token = 'my-token-is-this';
   * const alertDefIDs = ['123', '234'];
   *
   * const alertDefinition = new AlertDefinition(token, url);
   * const result = await alertDefinition.delete(alertDefIDs);
   * ```
   */
  delete(alertIds: string[] = []): Promise<void> {
    const url_: string =
      this.baseUrl +
      '/v1/alertDefinitions?' +
      arrayToQueryString(alertIds, 'alertIds');

    const options_: RequestInit = this.getOptionsRequest(this.token, 'DELETE');

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        const customMessages = {
          400: 'Alerts API error.',
          500: 'Server error and java exception.',
          default: 'An unexpected server error occurred.',
        };
        return this.proccessResponse(_response, customMessages);
      });
  }

  /**
   * Set enable or disable a list of alerts definitions.
   *
   * @see See the official documentation {@link https://docs.devo.com/confluence/ndt/latest/api-reference/alerting-api/working-with-alert-definitions#id-.Workingwithalertdefinitionsvv7.3.0-Updatealertdefinitionstatusesinbulk|here}.
   *
   * @param alertsId List of alert definitions IDs.
   * @param enable True or false value.
   * @returns
   *
   * @example Basic
   *
   * .
   *
   * ```ts
   * import { AlertDefinition } from '@devoinc/alerts-api-client';
   *
   * const url = 'https://api-us.devo.com/alerts';
   * const token = 'my-token-is-this';
   * const alertDefIDs = ['123', '234'];
   *
   * const alertDefinition = new AlertDefinition(token, url);
   * const result = await alertDefinition.enable(alertDefIDs, false);
   * ```
   */
  enable(alertsId: string[], enable: boolean): Promise<void> {
    let url_ = this.baseUrl + '/v1/alertDefinitions/status?';
    url_ += arrayToQueryString(alertsId, 'alertIds');
    url_ += `&enable=${encodeURIComponent(enable)}`;

    const options_: RequestInit = this.getOptionsRequest(this.token, 'PUT');

    return this.transformOptions(options_)
      .then((transformedOptions_) => {
        return this.http.fetch(url_, transformedOptions_);
      })
      .then((_response: Response) => {
        const customMessages = {
          400: 'Alerts API error.',
          403: 'Alerts API error. Alert not found.',
          500: 'Server error and java exception.',
          default: 'An unexpected server error occurred.',
        };
        return this.proccessResponse(_response, customMessages);
      });
  }
}
