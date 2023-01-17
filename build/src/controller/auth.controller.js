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
Object.defineProperty(exports, '__esModule', { value: true });
exports.refreshAccessTokenHandler = exports.createSessionHandler = void 0;
var lodash_1 = require('lodash');
var auth_service_1 = require('../service/auth.service');
var user_service_1 = require('../service/user.service');
var jwt_utils_1 = require('../utils/jwt.utils');
function createSessionHandler(
    // eslint-disable-next-line @typescript-eslint/ban-types
    req,
    res
) {
    return __awaiter(this, void 0, void 0, function () {
        var message,
            _a,
            email,
            password,
            user,
            isValid,
            accessToken,
            refreshToken;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    message = 'Invalid email or password';
                    (_a = req.body),
                        (email = _a.email),
                        (password = _a.password);
                    return [
                        4 /*yield*/,
                        (0, user_service_1.findUserByEmail)(email),
                    ];
                case 1:
                    user = _b.sent();
                    if (!user) {
                        return [2 /*return*/, res.send(message)];
                    }
                    return [
                        4 /*yield*/,
                        (0, user_service_1.validatePassword)({
                            email: email,
                            password: password,
                        }),
                    ];
                case 2:
                    isValid = _b.sent();
                    if (!isValid) {
                        return [2 /*return*/, res.send(message)];
                    }
                    return [
                        4 /*yield*/,
                        (0, auth_service_1.signAccessToken)(user),
                    ];
                case 3:
                    accessToken = _b.sent();
                    return [
                        4 /*yield*/,
                        (0, auth_service_1.signRefreshToken)({
                            userId: user._id,
                        }),
                    ];
                case 4:
                    refreshToken = _b.sent();
                    // send the tokens
                    return [
                        2 /*return*/,
                        res.send({
                            accessToken: accessToken,
                            refreshToken: refreshToken,
                        }),
                    ];
            }
        });
    });
}
exports.createSessionHandler = createSessionHandler;
function refreshAccessTokenHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var refreshToken,
            _a,
            payload,
            protectedHeader,
            decoded,
            session,
            _b,
            user,
            accessToken;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    refreshToken = (0, lodash_1.get)(req, 'headers.x-refresh');
                    return [
                        4 /*yield*/,
                        (0, jwt_utils_1.verifyJwt)(
                            refreshToken[0],
                            'refreshTokenPublicKeyEncoded'
                        ),
                    ];
                case 1:
                    (_a = _c.sent()),
                        (payload = _a.payload),
                        (protectedHeader = _a.protectedHeader);
                    decoded = payload;
                    if (!decoded) {
                        return [
                            2 /*return*/,
                            res
                                .status(401)
                                .send('Could not refresh access token'),
                        ];
                    }
                    // console.log(decoded);
                    _b = auth_service_1.findSessionById;
                    return [4 /*yield*/, decoded];
                case 2:
                    return [
                        4 /*yield*/,
                        _b.apply(void 0, [_c.sent().payload.session]),
                    ];
                case 3:
                    session = _c.sent();
                    if (!session || !session.valid) {
                        return [
                            2 /*return*/,
                            res
                                .status(401)
                                .send('Could not refresh access token'),
                        ];
                    }
                    return [
                        4 /*yield*/,
                        (0, user_service_1.findUserById)(String(session.user)),
                    ];
                case 4:
                    user = _c.sent();
                    if (!user) {
                        return [
                            2 /*return*/,
                            res
                                .status(401)
                                .send('Could not refresh access token'),
                        ];
                    }
                    return [
                        4 /*yield*/,
                        (0, auth_service_1.signAccessToken)(user),
                    ];
                case 5:
                    accessToken = _c.sent();
                    return [
                        2 /*return*/,
                        res.send({ accessToken: accessToken }),
                    ];
            }
        });
    });
}
exports.refreshAccessTokenHandler = refreshAccessTokenHandler;
