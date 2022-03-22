import 'isomorphic-fetch';
import { AlertDefinitionObject } from '../src/common';

import { AlertsAPIClient } from '../src';

// Comment those two following lines to use default fetch
// and change the url and token values
import { Fetch } from './__mocks__/fetch';
global.fetch = jest.fn((url) => Fetch.fetch(url)) as jest.Mock;

const url = 'https://api-us.devo.com/alerts';
const token = '12345678';

describe('Alerts API Client unit tests with mocks', () => {
  test('Triggered alerts: get', async () => {
    const client = new AlertsAPIClient(token, url);
    const result = await client.alert.get({
      from: '1647302400000',
      to: '1647427211005',
      limit: '3',
      offset: '0',
    });
    expect(result).toBeInstanceOf(Object);
  });

  test('Triggered alerts: updateStatus', async () => {
    const client = new AlertsAPIClient(token, url);
    const result = await client.alert.updateStatus('123', 100);
    expect(result).toBeInstanceOf(Object);
  });

  test('Triggered alerts: updateStatus list', async () => {
    const client = new AlertsAPIClient(token, url);
    const result = await client.alert.updateStatus(['123', '234'], 100);
    expect(result).toBeInstanceOf(Object);
  });

  test('AlertDefinition: Get list alerts definitions', async () => {
    const client = new AlertsAPIClient(token, url);
    const result = await client.alertDefinition.get();
    expect(result).toBeInstanceOf(Array);
  });

  test('AlertDefinition: Update alert definition', async () => {
    const client = new AlertsAPIClient(token, url);
    const alertDefinition: AlertDefinitionObject = {
      id: '173025',
      name: 'Test Alert Definition 45',
      description: 'Edited Just a description',
      subcategory: 'APIClientTest',
      alertCorrelationContext: {
        querySourceCode:
          'from siem.logtrust.web.activity group every 3h select count() as c where c > 10',
        priority: 2,
        correlationTrigger: {
          kind: 'each',
        },
      },
    };
    const result = await client.alertDefinition.update(alertDefinition);
    expect(result).toBeInstanceOf(Object);
    expect(Array.isArray(result)).toBeFalsy();
  });

  test('AlertDefinition: Update a list of alerts definition', async () => {
    const client = new AlertsAPIClient(token, url);
    const alertDefinition: AlertDefinitionObject[] = [
      {
        id: '173025',
        name: 'Test Alert Definition 45',
        description: 'Edited Just a description',
        subcategory: 'APIClientTest',
        alertCorrelationContext: {
          querySourceCode:
            'from siem.logtrust.web.activity group every 3h select count() as c where c > 10',
          priority: 2,
          correlationTrigger: {
            kind: 'each',
          },
        },
      },
    ];
    const result = await client.alertDefinition.update(alertDefinition);
    expect(Array.isArray(result)).toBeTruthy();
  });

  test('AlertDefinition: Create alert definition', async () => {
    const client = new AlertsAPIClient(token, url);
    const alertDefinition: AlertDefinitionObject = {
      name: 'New alert def',
      description: 'Edited Just a description',
      subcategory: 'APIClientTest',
      alertCorrelationContext: {
        querySourceCode:
          'from siem.logtrust.web.activity group every 3h select count() as c where c > 10',
        priority: 2,
        correlationTrigger: {
          kind: 'each',
        },
      },
    };
    const result = await client.alertDefinition.create(alertDefinition);
    expect(result).toBeInstanceOf(Object);
  });

  test('AlertDefinition: Delete an alert definition', async () => {
    const client = new AlertsAPIClient(token, url);
    const response = await client.alertDefinition.delete(['173025']);
    expect(response).toBeNull();
  });

  test('AlertDefinition: UpdateStatus of a list of alerts definition', async () => {
    const client = new AlertsAPIClient(token, url);
    const response = await client.alertDefinition.enable(['173025'], false);
    expect(response).toBeNull();
  });
});
