/*
 * fw-fetch-wrapper <https://github.com/Protonko/fetch-wrapper>
 *
 * Copyright (c) 2020, Egor Ermolaev.
 * Released under the MIT License.
 */

import {TErrorResponse} from './types';

export class ClientResponse {
  private readonly _response: Response
  private readonly _errorCode: TErrorResponse
  private readonly _errorMessage: TErrorResponse

  constructor(
      response: Response | null,
      errorCode: TErrorResponse = null,
      errorMessage: TErrorResponse = null
  ) {
    this._response = response;
    this._errorCode = errorCode;
    this._errorMessage = errorMessage;
  }

  static getResponse({response, errorCode, errorMessage}) {
    return new ClientResponse(
        response,
        errorCode,
        errorMessage,
    );
  }

  static undefinedError() {
    return new ClientResponse(
        null,
        'Undefined error',
        'Failed to send request. Please try again',
    );
  }

  getContent() {
    return this._response?.json() ?? null;
  }

  getHeaders() {
    return this._response?.headers?.forEach(console.log);
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
