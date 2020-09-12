"use strict";
/*
 * fw-fetch-wrapper <https://github.com/Protonko/fetch-wrapper>
 *
 * Copyright (c) 2020, Egor Ermolaev.
 * Released under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientResponse = void 0;
var ClientResponse = /** @class */ (function () {
    function ClientResponse(response, errorCode, errorMessage) {
        if (errorCode === void 0) { errorCode = null; }
        if (errorMessage === void 0) { errorMessage = null; }
        this._response = response;
        this._errorCode = errorCode;
        this._errorMessage = errorMessage;
    }
    ClientResponse.getResponse = function (_a) {
        var response = _a.response, errorCode = _a.errorCode, errorMessage = _a.errorMessage;
        return new ClientResponse(response, errorCode, errorMessage);
    };
    ClientResponse.undefinedError = function () {
        return new ClientResponse(null, 'Undefined error', 'Failed to send request. Please try again');
    };
    ClientResponse.prototype.getContent = function () {
        var _a, _b;
        return (_b = (_a = this._response) === null || _a === void 0 ? void 0 : _a.json()) !== null && _b !== void 0 ? _b : null;
    };
    ClientResponse.prototype.getHeaders = function () {
        var _a, _b;
        return (_b = (_a = this._response) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b.forEach(console.log);
    };
    ClientResponse.prototype.getStatusCode = function () {
        var _a;
        return (_a = this === null || this === void 0 ? void 0 : this._response) === null || _a === void 0 ? void 0 : _a.status;
    };
    ClientResponse.prototype.getStatusText = function () {
        var _a;
        return (_a = this === null || this === void 0 ? void 0 : this._response) === null || _a === void 0 ? void 0 : _a.statusText;
    };
    ClientResponse.prototype.getErrorCode = function () {
        return this._errorCode;
    };
    ClientResponse.prototype.getErrorMessage = function () {
        return this._errorMessage;
    };
    return ClientResponse;
}());
exports.ClientResponse = ClientResponse;
