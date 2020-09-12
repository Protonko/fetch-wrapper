/*
 * fw-fetch-wrapper <https://github.com/Protonko/fetch-wrapper>
 *
 * Copyright (c) 2020, Egor Ermolaev.
 * Released under the MIT License.
 */

import {IOptions, IConfig} from './Interfaces';
import {TSearchParams} from './types';

export class ClientRequest {
  clientUrl: URL
  options: IConfig

  constructor(config: IConfig) {
    this.clientUrl = config.url;
    this.options = {
      method: 'GET',
      headers: config.headers,
    };
  }

  public params(params: IOptions): ClientRequest {
    const url: URL = this.clientUrl;
    const paramsArrays: Array<TSearchParams> = Object.entries(params);

    paramsArrays.forEach((param: TSearchParams) => {
      url.searchParams.append(...param);
    });

    return this;
  }

  public method(method: string): ClientRequest {
    this.options.method = method;

    return this;
  }

  public body(body: any): ClientRequest {
    this.options.body = JSON.stringify(body);

    return this;
  }

  public url(url: string): ClientRequest {
    this.clientUrl = new URL(url, this.clientUrl);

    return this;
  }

  public addHeader(name: string, value: string): ClientRequest {
    this.options.headers.append(name, value);

    return this;
  }

  public removeHeader(name: string): ClientRequest {
    this.options.headers.delete(name);

    return this;
  }
}
