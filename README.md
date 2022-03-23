# Alerts API client

Devo Alerts API Client is a client for [Devo Alerts API](https://docs.devo.com/confluence/ndt/v7.9.0/api-reference/alerting-api) writed in TypeScript.

This client use the version one (v1) Alerts API available.

## Requirements

- node > 14
- npm > 7

> **_NOTE:_**The clients was developed and test using _node v14.18.1_ and _npm v7.24.2_

## Getting started

### Instalation

Use one of those ways to use the Alerts API Client.

**Install from npm**

```js
npm install --save @devoinc/alerts-api-client
```

**Install from Github**

First, install _typescript_:

```js
npm install --save-dev typescript
```

Install the client:

```js
npm install --save https://github.com/DevoInc/alerts-api-client
```

**Install from source**

- Download the package from the GitHub repository
  https://github.com/DevoInc/alerts-api-client
- Install the package inside your project

```js
npm install --save /path/to/alerts-api-client
```

### Using the client

You can use the client by importing one of the specific class (_Alert_ or _AlertsDefinition_) according to the use you want to give it or by importing the class _AlertsAPIClient_ that allows all endpoints.

Using async/await:

```js
import { AlertDefinition } from '@devoinc/alerts-api-client';

// define the url that are you using and the token created.
const url = 'https://api-us.devo.com/alerts';
const token = 'my-token-is-this';

// initialize de Client
const alertDefs = new AlertDefinition(token, url);

// get alerts definitions
const alertDefinitions = await alertDefs.get();
```

Or instead of using async/await, you cal also use promises

```js
import { AlertDefinition } from '@devoinc/alerts-api-client';

// define the url that are you using and the token created.
const url = 'https://api-us.devo.com/alerts';
const token = 'my-token-is-this';

// initialize de Client
const alertDefs = new AlertDefinition(token, url);

// get alerts definitions
alertDefs
  .get()
  .then((alerts) => {
    // do something with alerts
  })
  .catch((error) => {
    console.log(error);
  });
```

Alternatively, you can use the _AlertsAPIClient_ class:

```js
import { AlertsAPIClient } from '@devoinc/alerts-api-client';

// define the url that are you using and the token created.
const url = 'https://api-us.devo.com/alerts';
const token = 'my-token-is-this';

// initialize de Client
const alertsAPIClient = new AlertsAPIClient(token, url);

// get alerts definitions
const alertDefinitions = await alertsAPIClient.alertDefinition.get();
// get alerts triggered
const alerts = await alertsAPIClient.alert.get();
```

## Documentation and usage

The documentation of this client is available at [GitHub](https://devoinc.github.io/alerts-api-client/).
Here you can find which methods are available for _alert_ and _alertDefinition_.
