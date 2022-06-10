export interface IConfig {
  getAuthorization: () => string;
}

export class ClientBase {

  private readonly config: IConfig;

  protected constructor(config: IConfig) {
    this.config = config;
  }

  protected transformOptions(options: RequestInit) {
    options.headers = {
      ...options.headers,
      standAloneToken: this.config.getAuthorization(),
    };
    return Promise.resolve(options);

  }

  protected transformResult(
    url: string,
    response: Response,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    processor: (response: Response) => any
  ) {
    console.log('Service call: ' + url);
    return processor(response);
  }
}
