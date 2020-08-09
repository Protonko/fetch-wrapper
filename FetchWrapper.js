import Response from './Response';
import Request from './Request';

export default class FetchWrapper {
  constructor(config) {
    this._baseURL = null;
    this._headers = {};

    this.configure(config);
  }

  configure(config) {
    this._baseURL = config?.baseURL;
    this._headers = config?.headers;
  }

  getBaseOptions() {
    const url = new URL(this._baseURL);
    const headers = {
      headers: this._headers,
    };

    return {url, headers};
  }

  sendRequest() {
    return new Request(this.getBaseOptions());
  }

  send(request) {
    const {clientUrl, options} = request;

    return this.middleware(clientUrl, options);
  }

  middleware(url, options) {
    return new Promise((resolve, reject) => {
      fetch(url, options)
          .then(response => resolve(Response.getResponse(response)))
          .catch(error => {
            if (error.response) {
              reject(Response.getResponse(error.response));
            } else {
              reject(Response.undefinedError());
            }
          });
    });
  }
}
