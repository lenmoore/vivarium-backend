"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("config"));
var mongoose_1 = __importDefault(require("mongoose"));
var logger_1 = __importDefault(require("./logger"));
function connect() {
    var dbUri = '';
    // dbUri = 'mongodb://db/vivarium';
    dbUri = config_1.default.get('dbUri');
    return mongoose_1.default
        .connect(dbUri)
        .then(function () {
        logger_1.default.info('connected to db');
    })
        .catch(function (err) { return logger_1.default.error(err); });
}
exports.default = connect;
