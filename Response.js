export default class Response {
  constructor(response, errorCode = null, errorMessage = null) {
    this._response = response;
    this._errorCode = errorCode;
    this._errorMessage = errorMessage;
  }

  static getResponse(response) {
    return new Response(
        response,
        response?.data?.errorCode,
        response?.data?.errorMessage,
    );
  }

  static undefinedError() {
    return new Response(
        null,
        'Undefined error',
        'Failed to send request. Please try again',
    );
  }

  getContent() {
    return this._response ? this._response.json() : undefined;
  }

  getHeaders() {
    return this._response
        ? this._response.headers.forEach(console.log)
        : undefined;
  }

  getStatusCode() {
    return this?._response?.status;
  }

  getStatusText() {
    return this?._response?.statusText;
  }

  getErrorCode() {
    return this._errorCode;
  }

  getErrorMessage() {
    return this._errorMessage;
  }
}
