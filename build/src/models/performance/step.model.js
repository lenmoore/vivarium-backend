"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Option = void 0;
// these are basically quiz type questions i guess
var mongoose_1 = __importDefault(require("mongoose"));
var nanoid_1 = require("nanoid");
var nanoid = (0, nanoid_1.customAlphabet)('abcdefghijklmnopqrstuvwxyz0123456789', 10);
var Option = /** @class */ (function () {
    function Option() {
    }
    return Option;
}());
exports.Option = Option;
var stepSchema = new mongoose_1.default.Schema({
    stepId: {
        type: String,
        required: true,
        unique: true,
        default: function () { return "step_".concat(nanoid()); },
    },
    question_text: { type: String, required: true },
    question_options: { type: [], default: [] },
}, {
    timestamps: true,
});
var StepModel = mongoose_1.default.model('Step', stepSchema);
exports.default = StepModel;
