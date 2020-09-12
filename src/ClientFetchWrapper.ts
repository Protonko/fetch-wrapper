/*
 * fw-fetch-wrapper <https://github.com/Protonko/fetch-wrapper>
 *
 * Copyright (c) 2020, Egor Ermolaev.
 * Released under the MIT License.
 */

import {ClientResponse} from './ClientResponse';
import {ClientRequest} from './ClientRequest';
import {IConfig, IErrorResponse, ISuccessResponse, IRequestOptions} from './Interfaces';

export class ClientFetchWrapper {
  private _baseURL: null | string
  private readonly _headers: Headers

  constructor(config: IConfig) {
    this._baseURL = null;
    this._headers = new Headers();

    this.configure(config);
  }

  public configure(config: IConfig): void {
    const headersKeys: Array<string> = config?.headers && Object.keys(config.headers);

    this._baseURL = config?.baseURL ?? null;

    headersKeys?.forEach(key => {
      this._headers.append(key, config.headers[key]);
    })
  }

  public getBaseOptions(): {url: URL, headers: Headers} {
    const url: URL = new URL(this._baseURL);
    const headers: Headers = this._headers;

    return {url, headers};
  }

  public sendRequest(): ClientRequest {
    return new ClientRequest(this.getBaseOptions());
  }

  public send(request): Promise<any> {
    const {clientUrl, options} = request;

    return this.middleware(clientUrl, options);
  }

  public middleware(url: RequestInfo, options: IRequestOptions) {
    return new Promise((resolve, reject) => {
      fetch(url, options)
          .then(response => {
            if (response.status >= 200 && response.status <= 299) {
              const data: ISuccessResponse = {
                response, errorCode: null, errorMessage: null,
              }

              return resolve(ClientResponse.getResponse(data));
            } else {
              if (response?.status && response?.statusText) {
                const error: IErrorResponse = {
                  response: null,
                  errorCode: response.status,
                  errorMessage: response.statusText
                };

                reject(error);
              } else {
                reject();
              }
            }
          })
          .catch(error => {
            if (error) {
              return ClientResponse.getResponse(error);
            } else {
              return ClientResponse.undefinedError();
            }
          });
    });
  }
}
