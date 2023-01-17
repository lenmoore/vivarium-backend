'use strict';
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator['throw'](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(fulfilled, rejected);
            }
            step(
                (generator = generator.apply(thisArg, _arguments || [])).next()
            );
        });
    };
var __generator =
    (this && this.__generator) ||
    function (thisArg, body) {
        var _ = {
                label: 0,
                sent: function () {
                    if (t[0] & 1) throw t[1];
                    return t[1];
                },
                trys: [],
                ops: [],
            },
            f,
            y,
            t,
            g;
        return (
            (g = { next: verb(0), throw: verb(1), return: verb(2) }),
            typeof Symbol === 'function' &&
                (g[Symbol.iterator] = function () {
                    return this;
                }),
            g
        );
        function verb(n) {
            return function (v) {
                return step([n, v]);
            };
        }
        function step(op) {
            if (f) throw new TypeError('Generator is already executing.');
            while ((g && ((g = 0), op[0] && (_ = 0)), _))
                try {
                    if (
                        ((f = 1),
                        y &&
                            (t =
                                op[0] & 2
                                    ? y['return']
                                    : op[0]
                                    ? y['throw'] ||
                                      ((t = y['return']) && t.call(y), 0)
                                    : y.next) &&
                            !(t = t.call(y, op[1])).done)
                    )
                        return t;
                    if (((y = 0), t)) op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (
                                !((t = _.trys),
                                (t = t.length > 0 && t[t.length - 1])) &&
                                (op[0] === 6 || op[0] === 2)
                            ) {
                                _ = 0;
                                continue;
                            }
                            if (
                                op[0] === 3 &&
                                (!t || (op[1] > t[0] && op[1] < t[3]))
                            ) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2]) _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                } catch (e) {
                    op = [6, e];
                    y = 0;
                } finally {
                    f = t = 0;
                }
            if (op[0] & 5) throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
exports.signVisitorAccessToken =
    exports.signAccessToken =
    exports.signRefreshToken =
    exports.updateSession =
    exports.findSessions =
    exports.findSessionById =
    exports.createSession =
        void 0;
var session_model_1 = __importDefault(require('../models/session.model'));
var jwt_utils_1 = require('../utils/jwt.utils');
function createSession(_a) {
    var userId = _a.userId;
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            return [
                2 /*return*/,
                session_model_1.default.create({ user: userId }),
            ];
        });
    });
}
exports.createSession = createSession;
function findSessionById(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, session_model_1.default.findById(id)];
        });
    });
}
exports.findSessionById = findSessionById;
function findSessions(query) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, session_model_1.default.find(query).lean()];
        });
    });
}
exports.findSessions = findSessions;
function updateSession(query, update) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [
                2 /*return*/,
                session_model_1.default.updateOne(query, update),
            ];
        });
    });
}
exports.updateSession = updateSession;
function signRefreshToken(_a) {
    var userId = _a.userId;
    return __awaiter(this, void 0, void 0, function () {
        var session, refreshToken;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    return [
                        4 /*yield*/,
                        createSession({
                            userId: userId,
                        }),
                    ];
                case 1:
                    session = _b.sent();
                    return [
                        4 /*yield*/,
                        (0, jwt_utils_1.signJwt)(
                            {
                                session: session._id,
                            },
                            'refreshTokenPrivateKeyEncoded',
                            {
                                expiresIn: '1y',
                            }
                        ),
                    ];
                case 2:
                    refreshToken = _b.sent();
                    // console.log('signed refresh token', refreshToken);
                    return [2 /*return*/, refreshToken];
            }
        });
    });
}
exports.signRefreshToken = signRefreshToken;
function signAccessToken(user) {
    return __awaiter(this, void 0, void 0, function () {
        var payload, accessToken;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    payload = user.toJSON();
                    // console.log(user);
                    return [
                        4 /*yield*/,
                        (0, jwt_utils_1.signJwt)(
                            payload,
                            'accessTokenPrivateKeyEncoded'
                        ),
                    ];
                case 1:
                    accessToken = _a.sent();
                    // console.log('signed accessToken', accessToken);
                    return [2 /*return*/, accessToken];
            }
        });
    });
}
exports.signAccessToken = signAccessToken;
function signVisitorAccessToken(visitor) {
    return __awaiter(this, void 0, void 0, function () {
        var payload, accessToken;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    payload = visitor;
                    // console.log(visitor);
                    return [
                        4 /*yield*/,
                        (0, jwt_utils_1.signVisitorJwt)(
                            payload,
                            'accessTokenPrivateKeyEncoded'
                        ),
                    ];
                case 1:
                    accessToken = _a.sent();
                    // console.log('signed accessToken', accessToken);
                    return [2 /*return*/, accessToken];
            }
        });
    });
}
exports.signVisitorAccessToken = signVisitorAccessToken;
