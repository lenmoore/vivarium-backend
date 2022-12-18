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
exports.getStepSchema = exports.deleteStepSchema = exports.updateStepSchema = exports.createStepSchema = void 0;
var zod_1 = require("zod");
var payload = {
    body: (0, zod_1.object)({}),
};
var params = {
    params: (0, zod_1.object)({
        stepId: (0, zod_1.string)({
            required_error: 'stepId is required',
        }),
    }),
};
exports.createStepSchema = (0, zod_1.object)(__assign({}, payload));
exports.updateStepSchema = (0, zod_1.object)(__assign(__assign({}, payload), params));
exports.deleteStepSchema = (0, zod_1.object)(__assign({}, params));
exports.getStepSchema = (0, zod_1.object)(__assign({}, params));
