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
exports.getVisitorSchema = exports.deleteVisitorSchema = exports.updateVisitorSchema = exports.createVisitorSchema = void 0;
var zod_1 = require("zod");
var payload = {
    body: (0, zod_1.object)({
        username: (0, zod_1.string)({
            required_error: 'username is required',
        }),
        wardrobe_number: (0, zod_1.number)({
            required_error: 'wardrobe number is required',
        }),
        wants_newsletter: (0, zod_1.boolean)({
            required_error: 'newsletter info is required',
        }),
        wants_summary: (0, zod_1.boolean)({
            required_error: 'summary info is required',
        }),
        basket: (0, zod_1.optional)((0, zod_1.object)({})),
        quiz_results: (0, zod_1.optional)((0, zod_1.array)((0, zod_1.object)({}))),
        performance: (0, zod_1.optional)((0, zod_1.string)()),
        archived: (0, zod_1.optional)((0, zod_1.boolean)()),
    }),
};
var params = {
    params: (0, zod_1.object)({
        visitorId: (0, zod_1.string)({
            required_error: 'visitorId is required',
        }),
        basket: (0, zod_1.optional)((0, zod_1.object)({
            basket_id: (0, zod_1.string)(),
        })),
        quiz_results: (0, zod_1.optional)((0, zod_1.array)((0, zod_1.object)({}))),
        performance: (0, zod_1.optional)((0, zod_1.object)({
            performance_id: (0, zod_1.string)(),
        })),
        archived: (0, zod_1.optional)((0, zod_1.boolean)()),
    }),
};
exports.createVisitorSchema = (0, zod_1.object)(__assign({}, payload));
exports.updateVisitorSchema = (0, zod_1.object)(__assign(__assign({}, payload), params));
exports.deleteVisitorSchema = (0, zod_1.object)(__assign({}, params));
exports.getVisitorSchema = (0, zod_1.object)(__assign({}, params));
