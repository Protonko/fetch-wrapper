"use strict";
/*
 * fw-fetch-wrapper <https://github.com/Protonko/fetch-wrapper>
 *
 * Copyright (c) 2020, Egor Ermolaev.
 * Released under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientFetchWrapper = void 0;
var ClientResponse_1 = require("./ClientResponse");
var ClientRequest_1 = require("./ClientRequest");
var ClientFetchWrapper = /** @class */ (function () {
    function ClientFetchWrapper(config) {
        this._baseURL = null;
        this._headers = new Headers();
        this.configure(config);
    }
    ClientFetchWrapper.prototype.configure = function (config) {
        var _this = this;
        var _a;
        var headersKeys = (config === null || config === void 0 ? void 0 : config.headers) && Object.keys(config.headers);
        this._baseURL = (_a = config === null || config === void 0 ? void 0 : config.baseURL) !== null && _a !== void 0 ? _a : null;
        headersKeys === null || headersKeys === void 0 ? void 0 : headersKeys.forEach(function (key) {
            _this._headers.append(key, config.headers[key]);
        });
    };
    ClientFetchWrapper.prototype.getBaseOptions = function () {
        var url = new URL(this._baseURL);
        var headers = this._headers;
        return { url: url, headers: headers };
    };
    ClientFetchWrapper.prototype.sendRequest = function () {
        return new ClientRequest_1.ClientRequest(this.getBaseOptions());
    };
    ClientFetchWrapper.prototype.send = function (request) {
        var clientUrl = request.clientUrl, options = request.options;
        return this.middleware(clientUrl, options);
    };
    ClientFetchWrapper.prototype.middleware = function (url, options) {
        return new Promise(function (resolve, reject) {
            fetch(url, options)
                .then(function (response) {
                if (response.status >= 200 && response.status <= 299) {
                    var data = {
                        response: response,
                        errorCode: null, errorMessage: null,
                    };
                    return resolve(ClientResponse_1.ClientResponse.getResponse(data));
                }
                else {
                    if ((response === null || response === void 0 ? void 0 : response.status) && (response === null || response === void 0 ? void 0 : response.statusText)) {
                        var error = {
                            response: null,
                            errorCode: response.status,
                            errorMessage: response.statusText
                        };
                        reject(error);
                    }
                    else {
                        reject();
                    }
                }
            })
                .catch(function (error) {
                if (error) {
                    return ClientResponse_1.ClientResponse.getResponse(error);
                }
                else {
                    return ClientResponse_1.ClientResponse.undefinedError();
                }
            });
        });
    };
    return ClientFetchWrapper;
}());
exports.ClientFetchWrapper = ClientFetchWrapper;
