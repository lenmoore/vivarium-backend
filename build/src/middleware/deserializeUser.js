"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var session_service_1 = require("../service/session.service");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var jose = __importStar(require("jose"));
var deserializeUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var accessToken, refreshToken, decoded, exp, expirationDatetimeInSeconds, isExpired, newAccessToken, result, e_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                accessToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
                refreshToken = (0, lodash_1.get)(req, 'headers.x-refresh');
                if (!accessToken) {
                    return [2 /*return*/, next()];
                }
                return [4 /*yield*/, jose.decodeJwt(accessToken)];
            case 1:
                decoded = _b.sent();
                if (decoded) {
                    res.locals.user = {
                        username: decoded.email,
                        name: decoded.name || decoded.email,
                    };
                    return [2 /*return*/, next()];
                }
                exp = jsonwebtoken_1.default.decode(accessToken).exp;
                expirationDatetimeInSeconds = exp * 1000;
                isExpired = Date.now() >= expirationDatetimeInSeconds;
                console.log('is expired? ', isExpired);
                if (!(exp && isExpired && refreshToken)) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, session_service_1.reIssueAccessToken)({
                        refreshToken: refreshToken[0],
                    })];
            case 2:
                newAccessToken = _b.sent();
                if (newAccessToken) {
                    res.setHeader('x-access-token', newAccessToken);
                }
                result = jose.decodeJwt(accessToken);
                res.locals.user = {
                    username: result.email,
                    name: result.name || result.email,
                };
                return [2 /*return*/, next()];
            case 3: return [3 /*break*/, 5];
            case 4:
                e_1 = _b.sent();
                console.error(e_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/, next()];
        }
    });
}); };
exports.default = deserializeUser;
