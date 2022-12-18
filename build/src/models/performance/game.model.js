"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GAMETYPE = void 0;
var nanoid_1 = require("nanoid");
var mongoose_1 = __importDefault(require("mongoose"));
var nanoid = (0, nanoid_1.customAlphabet)('abcdefghijklmnopqrstuvwxyz0123456789', 10);
var GAMETYPE;
(function (GAMETYPE) {
    GAMETYPE["QUIZ"] = "QUIZ";
    GAMETYPE["HUMANITY_SHOP"] = "SHOP";
})(GAMETYPE = exports.GAMETYPE || (exports.GAMETYPE = {}));
var gameSchema = new mongoose_1.default.Schema({
    gameId: {
        type: String,
        required: true,
        unique: true,
        default: function () { return "game_".concat(nanoid()); },
    },
    name: { type: String, required: true },
    game_type: { type: String, default: GAMETYPE.QUIZ },
    game_steps: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Step' }],
    game_players: [
        { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Visitor' },
    ],
    open_for_colors: [{ type: String, default: 'all' }],
    pre_capsule: { type: Boolean, default: true },
}, {
    timestamps: true,
});
var GameModel = mongoose_1.default.model('Game', gameSchema);
exports.default = GameModel;
