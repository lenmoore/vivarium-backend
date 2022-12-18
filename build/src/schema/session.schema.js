"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSessionSchema = void 0;
var zod_1 = require("zod");
exports.createSessionSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({
            required_error: 'Email is required',
        }),
        password: (0, zod_1.string)({
            required_error: 'Password is required',
        }),
    }),
});
