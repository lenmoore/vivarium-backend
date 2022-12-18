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
exports.getPerformanceSchema = exports.deletePerformanceSchema = exports.updatePerformanceSchema = exports.createPerformanceSchema = void 0;
var zod_1 = require("zod");
var payload = {
    body: (0, zod_1.object)({}),
};
var params = {
    params: (0, zod_1.object)({
        performanceId: (0, zod_1.string)({
            required_error: 'performanceId is required',
        }),
    }),
};
exports.createPerformanceSchema = (0, zod_1.object)(__assign({}, payload));
exports.updatePerformanceSchema = (0, zod_1.object)(__assign(__assign({}, payload), params));
exports.deletePerformanceSchema = (0, zod_1.object)(__assign({}, params));
exports.getPerformanceSchema = (0, zod_1.object)(__assign({}, params));
