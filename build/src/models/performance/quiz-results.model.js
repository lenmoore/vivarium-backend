"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var nanoid_1 = require("nanoid");
var mongoose_1 = __importDefault(require("mongoose"));
var nanoid = (0, nanoid_1.customAlphabet)('abcdefghijklmnopqrstuvwxyz0123456789', 10);
var quizResultSchema = new mongoose_1.default.Schema({
    quizResultId: {
        type: String,
        required: true,
        unique: true,
        default: function () { return "quiz_result_".concat(nanoid()); },
    },
    visitor: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Visitor' },
    game: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Game',
        required: false,
    },
    step: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Step' },
    result_text: { type: String, required: true },
    result_humanity_values: { type: Object, required: false },
});
var QuizResultModel = mongoose_1.default.model('QuizResult', quizResultSchema);
exports.default = QuizResultModel;
