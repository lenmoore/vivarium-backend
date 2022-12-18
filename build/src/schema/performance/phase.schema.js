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
exports.getPhaseSchema = exports.deletePhaseSchema = exports.updatePhaseSchema = exports.createPhaseSchema = void 0;
var zod_1 = require("zod");
var payload = {
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: 'name is required',
        }),
        phase_game: (0, zod_1.optional)((0, zod_1.string)()),
        active: (0, zod_1.boolean)({
            required_error: 'active is required',
        }),
        phase_start: (0, zod_1.optional)((0, zod_1.string)()),
        phase_end: (0, zod_1.optional)((0, zod_1.string)()),
    }),
};
var params = {
    params: (0, zod_1.object)({
        phaseId: (0, zod_1.string)({
            required_error: 'id is required',
        }),
    }),
};
exports.createPhaseSchema = (0, zod_1.object)(__assign({}, payload));
exports.updatePhaseSchema = (0, zod_1.object)(__assign(__assign({}, payload), params));
exports.deletePhaseSchema = (0, zod_1.object)(__assign({}, params));
exports.getPhaseSchema = (0, zod_1.object)(__assign({}, params));
