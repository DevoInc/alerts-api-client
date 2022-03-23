import * as fs from 'fs';

export class Fetch {
  static fetch(url: string) {
    return new Promise((resolve, reject) => {
      const lastSlash = url.lastIndexOf('v1');
      const operation = url
        .substring(lastSlash + 3)
        .replace(/\//g, '_')
        .replace(/\?/g, '_')
        .replace(/=/g, '_')
        .replace(/&/g, '_');
      const hasError = url.lastIndexOf('/error/');
      fs.readFile(
        `./test/__mockData__/${operation}.json`,
        'utf8',
        (err, data) => {
          if (err || hasError > 0) {
            if (hasError > 0) {
              const errorValue = url.substring(hasError + 7, hasError + 10);
              resolve({
                status: parseInt(errorValue),
                text: () => Promise.resolve('Mock error'),
              });
            } else {
              reject(err);
            }
          } else {
            resolve({
              status: 200,
              text: () => Promise.resolve(data),
            });
          }
        }
      );
    });
  }
}
