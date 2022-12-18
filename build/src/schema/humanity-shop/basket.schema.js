"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBasketByVisitorSchema = exports.getBasketSchema = exports.deleteBasketSchema = exports.updateBasketSchema = exports.createBasketSchema = void 0;
var zod_1 = require("zod");
var payload = {
    body: (0, zod_1.object)({}),
};
var params = {
    params: (0, zod_1.object)({
        basketId: (0, zod_1.string)({
            required_error: 'basketId is required',
        }),
    }),
};
exports.createBasketSchema = (0, zod_1.object)(__assign({}, payload));
exports.updateBasketSchema = (0, zod_1.object)(__assign(__assign({}, payload), params));
exports.deleteBasketSchema = (0, zod_1.object)(__assign({}, params));
exports.getBasketSchema = (0, zod_1.object)(__assign({}, params));
exports.getBasketByVisitorSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        visitorId: (0, zod_1.string)({
            required_error: 'visitorId is required',
        }),
    }),
});
