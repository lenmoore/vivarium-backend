"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = void 0;
var zod_1 = require("zod");
exports.createUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: 'Name is required',
        }),
        password: (0, zod_1.string)({
            required_error: 'Name is required',
        }).min(1, 'Wardrobe number too short - should be 1 char minimum'),
        passwordConfirmation: (0, zod_1.string)({
            required_error: 'passwordConfirmation is required',
        }),
        email: (0, zod_1.string)({
            required_error: 'Email is required',
        }).email('Not a valid email'),
    }).refine(function (data) { return data.password === data.passwordConfirmation; }, {
        message: 'Passwords do not match',
        path: ['passwordConfirmation'],
    }),
});
