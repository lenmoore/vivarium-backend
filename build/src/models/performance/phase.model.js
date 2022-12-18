"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var nanoid_1 = require("nanoid");
var mongoose_1 = __importDefault(require("mongoose"));
var nanoid = (0, nanoid_1.customAlphabet)('abcdefghijklmnopqrstuvwxyz0123456789', 10);
var phaseSchema = new mongoose_1.default.Schema({
    phaseId: {
        type: String,
        required: true,
        unique: true,
        default: function () { return "phase_".concat(nanoid()); },
    },
    active: { type: Boolean, required: false },
    name: { type: String, required: true },
    phase_game: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Game' },
    phase_start: { type: Date, required: false },
    phase_end: { type: Date, required: false },
}, {
    timestamps: true,
});
var PhaseModel = mongoose_1.default.model('Phase', phaseSchema);
exports.default = PhaseModel;
