"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var nanoid_1 = require("nanoid");
var nanoid = (0, nanoid_1.customAlphabet)('abcdefghijklmnopqrstuvwxyz0123456789', 10);
var basketSchema = new mongoose_1.default.Schema({
    basketId: {
        type: String,
        required: true,
        unique: true,
        default: function () { return "basket_".concat(nanoid()); },
    },
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    visitor: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Visitor' },
    products: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Product' }],
    coins_left: Number,
    confirmed: Boolean,
}, {
    timestamps: true,
});
var BasketModel = mongoose_1.default.model('Basket', basketSchema);
exports.default = BasketModel;
