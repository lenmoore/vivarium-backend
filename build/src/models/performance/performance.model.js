"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var nanoid_1 = require("nanoid");
var nanoid = (0, nanoid_1.customAlphabet)('abcdefghijklmnopqrstuvwxyz0123456789', 10);
var performanceSchema = new mongoose_1.default.Schema({
    performanceId: {
        type: String,
        required: true,
        unique: true,
        default: function () { return "performance_".concat(nanoid()); },
    },
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Performance' },
    visitors: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Visitor' }],
    title: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    phases: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Phase' }],
    active: { type: Boolean, default: false },
    are_visitors_in_groups: { type: Boolean, default: false },
}, {
    timestamps: true,
});
var PerformanceModel = mongoose_1.default.model('Performance', performanceSchema);
exports.default = PerformanceModel;
