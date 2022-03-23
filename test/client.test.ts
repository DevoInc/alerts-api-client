import 'isomorphic-fetch';
import { AlertDefinitionObject } from '../src/common';

import { AlertsAPIClient } from '../src';

// Comment those two following lines to use default fetch
// and change the url and token values
import { Fetch } from './__mocks__/fetch';
import { AlertsAPIClientException } from '../src/common/errors';
global.fetch = jest.fn((url) => Fetch.fetch(url)) as jest.Mock;

const url = 'https://api-us.devo.com/alerts';
const token = '12345678';

describe('Triggered alerts: Get', () => {
  const cases = [
    ['Error 400', 400, 'Alerts API error.'],
    ['Error default', 401, 'An unexpected server error occurred.'],
  ];

  const filters = {
    from: '1647302400000',
    to: '1647427211005',
    limit: '3',
    offset: '0',
  };
  test('Basic', async () => {
    const client = new AlertsAPIClient(token, url);
    const result = await client.alert.get(filters);
    expect(result).toBeInstanceOf(Object);
  });

  it.each(cases)('%s', async (_title, _status, _message) => {
    const client = new AlertsAPIClient(token, `${url}/error/${_status}`);
    try {
      await client.alert.get(filters);
    } catch (e) {
      if (e instanceof AlertsAPIClientException) {
        expect(e).toBeInstanceOf(AlertsAPIClientException);
        expect(e.status).toBe(_status);
        expect(e.message).toBe(`${_message}`);
      }
    }
  });
});

describe('Triggered alerts: updateStatus', () => {
  const cases = [
    ['Error 400', 400, 'Alerts not exists with this id.'],
    ['Error default', 401, 'An unexpected server error occurred.'],
  ];
  test('Simple alert', async () => {
    const client = new AlertsAPIClient(token, url);
    const result = await client.alert.updateStatus('123', 100);
    expect(result).toBeInstanceOf(Object);
  });

  test('List of alerts', async () => {
    const client = new AlertsAPIClient(token, url);
    const result = await client.alert.updateStatus(['123', '234'], 100);
    expect(result).toBeInstanceOf(Object);
  });

  it.each(cases)('%s', async (_title, _status, _message) => {
    const client = new AlertsAPIClient(token, `${url}/error/${_status}`);
    try {
      await client.alert.updateStatus('123', 100);
    } catch (e) {
      if (e instanceof AlertsAPIClientException) {
        expect(e).toBeInstanceOf(AlertsAPIClientException);
        expect(e.status).toBe(_status);
        expect(e.message).toBe(`${_message}`);
      }
    }
  });
});

describe('AlertDefinition: Get', () => {
  const cases = [
    ['Error 400', 400, 'Alerts definition error.'],
    ['Error default', 401, 'An unexpected server error occurred.'],
  ];
  test('AlertDefinition: Get list alerts definitions', async () => {
    const client = new AlertsAPIClient(token, url);
    const result = await client.alertDefinition.get();
    expect(result).toBeInstanceOf(Array);
  });

  it.each(cases)('%s', async (_title, _status, _message) => {
    const client = new AlertsAPIClient(token, `${url}/error/${_status}`);
    try {
      await client.alertDefinition.get();
    } catch (e) {
      if (e instanceof AlertsAPIClientException) {
        expect(e).toBeInstanceOf(AlertsAPIClientException);
        expect(e.status).toBe(_status);
        expect(e.message).toBe(`${_message}`);
      }
    }
  });
});

describe('AlertDefinition: Update', () => {
  const cases = [
    ['Error 400', 400, 'Alerts API error.'],
    ['Error default', 401, 'An unexpected server error occurred.'],
  ];
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
  test('AlertDefinition: Update alert definition', async () => {
    const client = new AlertsAPIClient(token, url);
    const result = await client.alertDefinition.update(alertDefinition);
    expect(result).toBeInstanceOf(Object);
    expect(Array.isArray(result)).toBeFalsy();
  });

  test('AlertDefinition: Update a list of alerts definition', async () => {
    const client = new AlertsAPIClient(token, url);
    const alertsDefinition: AlertDefinitionObject[] = [alertDefinition];
    const result = await client.alertDefinition.update(alertsDefinition);
    expect(Array.isArray(result)).toBeTruthy();
  });

  it.each(cases)('%s', async (_title, _status, _message) => {
    const client = new AlertsAPIClient(token, `${url}/error/${_status}`);
    try {
      await client.alertDefinition.update(alertDefinition);
    } catch (e) {
      if (e instanceof AlertsAPIClientException) {
        expect(e).toBeInstanceOf(AlertsAPIClientException);
        expect(e.status).toBe(_status);
        expect(e.message).toBe(`${_message}`);
      }
    }
  });
});
describe('AlertDefinition: Create', () => {
  const cases = [
    ['Error 400', 400, 'Alerts API error.'],
    ['Error 500', 500, 'Server error and java exception.'],
    ['Error default', 401, 'An unexpected server error occurred.'],
  ];
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
  test('AlertDefinition: Create alert definition', async () => {
    const client = new AlertsAPIClient(token, url);
    const result = await client.alertDefinition.create(alertDefinition);
    expect(result).toBeInstanceOf(Object);
  });

  it.each(cases)('%s', async (_title, _status, _message) => {
    const client = new AlertsAPIClient(token, `${url}/error/${_status}`);
    try {
      await client.alertDefinition.create(alertDefinition);
    } catch (e) {
      if (e instanceof AlertsAPIClientException) {
        expect(e).toBeInstanceOf(AlertsAPIClientException);
        expect(e.status).toBe(_status);
        expect(e.message).toBe(`${_message}`);
      }
    }
  });
});

describe('AlertDefinition: Delete', () => {
  const cases = [
    ['Error 400', 400, 'Alerts API error.'],
    ['Error 500', 500, 'Server error and java exception.'],
    ['Error default', 401, 'An unexpected server error occurred.'],
  ];
  test('AlertDefinition: Delete an alert definition', async () => {
    const client = new AlertsAPIClient(token, url);
    const response = await client.alertDefinition.delete(['173025']);
    expect(response).toBeNull();
  });

  it.each(cases)('%s', async (_title, _status, _message) => {
    const client = new AlertsAPIClient(token, `${url}/error/${_status}`);
    try {
      await client.alertDefinition.delete(['173025']);
    } catch (e) {
      if (e instanceof AlertsAPIClientException) {
        expect(e).toBeInstanceOf(AlertsAPIClientException);
        expect(e.status).toBe(_status);
        expect(e.message).toBe(`${_message}`);
      }
    }
  });
});

describe('AlertDefinition: UpdateStatus', () => {
  const cases = [
    ['Error 400', 400, 'Alerts API error.'],
    ['Error 403', 403, 'Alerts API error. Alert not found.'],
    ['Error 500', 500, 'Server error and java exception.'],
    ['Error default', 401, 'An unexpected server error occurred.'],
  ];
  test('AlertDefinition: UpdateStatus of a list of alerts definition', async () => {
    const client = new AlertsAPIClient(token, url);
    const response = await client.alertDefinition.enable(['173025'], false);
    expect(response).toBeNull();
  });
  it.each(cases)('%s', async (_title, _status, _message) => {
    const client = new AlertsAPIClient(token, `${url}/error/${_status}`);
    try {
      await client.alertDefinition.enable(['173025'], false);
    } catch (e) {
      if (e instanceof AlertsAPIClientException) {
        expect(e).toBeInstanceOf(AlertsAPIClientException);
        expect(e.status).toBe(_status);
        expect(e.message).toBe(`${_message}`);
      }
    }
  });
});
