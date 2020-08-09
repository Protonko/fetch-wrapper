export default class Request {
  constructor(config) {
    this.clientUrl = config.url;
    this.options = {
      method: 'GET',
      ...config.headers,
    };
  }

  params(params) {
    const url = this.clientUrl;
    const paramsArrays = Object.entries(params);

    paramsArrays.forEach(param => {
      url.searchParams.append(...param);
    });

    return this;
  }

  method(method) {
    this.options.method = method;

    return this;
  }

  body(body) {
    this.options.body = JSON.stringify(body);

    return this;
  }

  url(url) {
    this.clientUrl = new URL(url, this.clientUrl);

    return this;
  }

  addHeader(name, value) {
    this.options.headers[name] = value;

    return this;
  }

  removeHeader(name) {
    delete this.options.headers[name];

    return this;
  }
}
