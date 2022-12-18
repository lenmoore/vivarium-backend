"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var nanoid_1 = require("nanoid");
var nanoid = (0, nanoid_1.customAlphabet)('abcdefghijklmnopqrstuvwxyz0123456789', 10);
var visitorSchema = new mongoose_1.default.Schema({
    visitorId: {
        type: String,
        required: true,
        unique: true,
        default: function () { return "visitor_".concat(nanoid()); },
    },
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    humanity_values: {
        green: Number,
        fuchsia: Number,
        blue: Number,
        orange: Number,
    },
    archived: { type: Boolean, default: false },
    basket: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Basket' },
    performance: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Performance',
    },
    username: { type: String, required: false },
    wardrobe_number: { type: Number, required: true },
    wants_newsletter: { type: Boolean, required: true },
    quiz_results: [
        { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'QuizResult' },
    ],
    accessToken: { type: String, default: '' },
    confirmed_humanity_value: { type: String, default: 'none' },
}, {
    timestamps: true,
});
var VisitorModel = mongoose_1.default.model('Visitor', visitorSchema);
exports.default = VisitorModel;
