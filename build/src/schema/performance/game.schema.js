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
exports.getGameSchema = exports.deleteGameSchema = exports.updateGameSchema = exports.createGameSchema = void 0;
var zod_1 = require("zod");
var payload = {
    body: (0, zod_1.object)({}),
};
var params = {
    params: (0, zod_1.object)({
        gameId: (0, zod_1.string)({
            required_error: 'gameId is required',
        }),
    }),
};
exports.createGameSchema = (0, zod_1.object)(__assign({}, payload));
exports.updateGameSchema = (0, zod_1.object)(__assign(__assign({}, payload), params));
exports.deleteGameSchema = (0, zod_1.object)(__assign({}, params));
exports.getGameSchema = (0, zod_1.object)(__assign({}, params));
