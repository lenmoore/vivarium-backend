'use strict';
var __assign =
    (this && this.__assign) ||
    function () {
        __assign =
            Object.assign ||
            function (t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s)
                        if (Object.prototype.hasOwnProperty.call(s, p))
                            t[p] = s[p];
                }
                return t;
            };
        return __assign.apply(this, arguments);
    };
Object.defineProperty(exports, '__esModule', { value: true });
exports.getProductSchema =
    exports.deleteProductSchema =
    exports.updateProductSchema =
    exports.createProductSchema =
        void 0;
var zod_1 = require('zod');
var payload = {
    body: (0, zod_1.object)({
        title: (0, zod_1.string)({
            required_error: 'title is required',
        }),
        description: (0, zod_1.string)({
            required_error: 'description is required',
        }),
        price: (0, zod_1.number)({
            required_error: 'price is required',
        }),
        image: (0, zod_1.string)({
            required_error: 'image is required',
        }),
        humanity_values: (0, zod_1.optional)(
            (0, zod_1.object)({
                lime: (0, zod_1.number)(),
                fuchsia: (0, zod_1.number)(),
                silver: (0, zod_1.number)(),
                turq: (0, zod_1.number)(),
            })
        ),
    }),
};
var params = {
    params: (0, zod_1.object)({
        productId: (0, zod_1.string)({
            required_error: 'productId is required',
        }),
    }),
};
exports.createProductSchema = (0, zod_1.object)(__assign({}, payload));
exports.updateProductSchema = (0, zod_1.object)(
    __assign(__assign({}, payload), params)
);
exports.deleteProductSchema = (0, zod_1.object)(__assign({}, params));
exports.getProductSchema = (0, zod_1.object)(__assign({}, params));
