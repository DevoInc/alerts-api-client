# Alerts API client

Devo Alerts API Client is a client for [Devo Alerts API](https://docs.devo.com/space/latest/95128644/Alerts%20API) writed in TypeScript.

## Requirements

- node > 16
- npm > 8

> **_NOTE:_**The clients was developed and test using _node v16.15.1_ and _npm v8.11.0_

## Getting started

### Installation

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

Prior to instantiate the client, you need to create a class which implements the IConfig interface, for example, in this example we create a class called AuthConfig:

```js
import { IConfig } from "@devoinc/alerts-api-client";

const credentials = require('../../.credentials/tapu.json');

export class AuthConfig implements IConfig {
    getAuthorization() {
      return credentials.token;
    }
  }

```

Now you can instantiate the client. In the case that you use async/await:

```js
import { Client } from '@devoinc/alerts-api-client';

// define the url that are you using and the token created.
const url = 'https://api-us.devo.com/alerts';

const authConfig: AuthConfig = new AuthConfig();

// initialize the Client
const client = new Client(authConfig, url);

// get alert
const alertId = 1;
const alert: Alert = await client.get(alertId, true, true);
```

Or instead of using async/await, you can also use promises:

```js
import { AlertDefinition } from '@devoinc/alerts-api-client';

// define the url that are you using and the token created.
const url = 'https://api-us.devo.com/alerts';

const authConfig: AuthConfig = new AuthConfig();

// initialize the Client
const client = new Client(authConfig, url);

// get alert
const alertId = 1;
client
  .get(alertId, true, true)
  .then((alert) => {
    // do something with the alert
  })
  .catch((error) => {
    console.log(error);
  });
```

## Supported Endpoints

### Comments
- addComments
- deleteComment
- updateComment
- updateComments
- addComment
- getList

### Alerts
- updateStatus
- updateStatusLists
- getListByCriterias
- getListByCriteriasOverview
- getStatistics
- listStatus
- get

### Alert definition
- getAlerts
- putAlerts
- postAlerts
- deleteAlerts
- putAlertsBatch
- postAlertsBatch
- putAlertStatus

### Tags
- setTags

## Nswag 

This client has been generated using Nswag. 

Nswag is a dotnet library that takes OpenApi documentation from an existing API and builds a typescript client to consume this at your front-end.

If you are going to regenerate this client be sure you firstly had installed at least [.net core 3.1 runtime](https://dotnet.microsoft.com/en-us/download/dotnet/3.1) in your local machine.

## Documentation and usage

The documentation of this client is available at [GitHub](https://devoinc.github.io/alerts-api-client/).