"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var nanoid_1 = require("nanoid");
var nanoid = (0, nanoid_1.customAlphabet)('abcdefghijklmnopqrstuvwxyz0123456789', 10);
var productSchema = new mongoose_1.default.Schema({
    productId: {
        type: String,
        required: true,
        unique: true,
        default: function () { return "product_".concat(nanoid()); },
    },
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String, required: false },
    qr_code: { type: String, required: false },
    price: { type: Number, required: true },
    image: { type: String, required: false },
    humanity_values: {
        green: { average: Number, entries: [] },
        fuchsia: { average: Number, entries: [] },
        blue: { average: Number, entries: [] },
        orange: { average: Number, entries: [] },
    },
    archived: { type: Boolean, required: false },
}, {
    timestamps: true,
});
var ProductModel = mongoose_1.default.model('Product', productSchema);
exports.default = ProductModel;
