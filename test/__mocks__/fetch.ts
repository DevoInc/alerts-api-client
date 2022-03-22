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

      console.log(operation);
      fs.readFile(
        `./test/__mockData__/${operation}.json`,
        'utf8',
        (err, data) => {
          if (err) reject(err);
          resolve({
            status: 200,
            text: () => Promise.resolve(data),
          });
        }
      );
    });
  }
}
