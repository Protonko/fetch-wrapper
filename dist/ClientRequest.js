"use strict";
/*
 * fw-fetch-wrapper <https://github.com/Protonko/fetch-wrapper>
 *
 * Copyright (c) 2020, Egor Ermolaev.
 * Released under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientRequest = void 0;
var ClientRequest = /** @class */ (function () {
    function ClientRequest(config) {
        this.clientUrl = config.url;
        this.options = {
            method: 'GET',
            headers: config.headers,
        };
    }
    ClientRequest.prototype.params = function (params) {
        var url = this.clientUrl;
        var paramsArrays = Object.entries(params);
        paramsArrays.forEach(function (param) {
            var _a;
            (_a = url.searchParams).append.apply(_a, param);
        });
        return this;
    };
    ClientRequest.prototype.method = function (method) {
        this.options.method = method;
        return this;
    };
    ClientRequest.prototype.body = function (body) {
        this.options.body = JSON.stringify(body);
        return this;
    };
    ClientRequest.prototype.url = function (url) {
        this.clientUrl = new URL(url, this.clientUrl);
        return this;
    };
    ClientRequest.prototype.addHeader = function (name, value) {
        this.options.headers.append(name, value);
        return this;
    };
    ClientRequest.prototype.removeHeader = function (name) {
        this.options.headers.delete(name);
        return this;
    };
    return ClientRequest;
}());
exports.ClientRequest = ClientRequest;
