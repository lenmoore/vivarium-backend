'use strict';
var __assign =
    (this && this.__assign) ||
    function () {
        __assign =
            Object.assign ||
            function (t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s)
                        if (Object.prototype.hasOwnProperty.call(s, p))
                            t[p] = s[p];
                }
                return t;
            };
        return __assign.apply(this, arguments);
    };
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
var __spreadArray =
    (this && this.__spreadArray) ||
    function (to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || Array.prototype.slice.call(from));
    };
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
exports.deleteVisitorHandler =
    exports.getVisitorsHandler =
    exports.getPerformanceVisitorsHandler =
    exports.getVisitorHandler =
    exports.updateVisitorHandler =
    exports.archiveVisitors =
    exports.archiveVisitorsHandler =
    exports.updateVisitorColorsHandler =
    exports.createVisitorHandler =
        void 0;
var visitor_service_1 = require('../../service/performance/visitor.service');
var user_service_1 = require('../../service/user.service');
var auth_service_1 = require('../../service/auth.service');
var basket_service_1 = require('../../service/humanity-shop/basket.service');
var performance_service_1 = require('../../service/performance/performance.service');
var quiz_results_model_1 = __importDefault(
    require('../../models/performance/quiz-results.model')
);
var visitor_model_1 = __importDefault(
    require('../../models/performance/visitor.model')
);
function createVisitorHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user,
            accessToken,
            userId,
            body,
            visitor,
            visitorBasket,
            performance_1,
            e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    return [
                        4 /*yield*/,
                        (0, user_service_1.createUser)({
                            name: req.body.username,
                            password: req.body.wardrobe_number,
                            passwordConfirmation: req.body.wardrobe_number,
                            email: req.body.email || '',
                        }),
                    ];
                case 1:
                    user = _a.sent();
                    return [
                        4 /*yield*/,
                        (0, auth_service_1.signVisitorAccessToken)(user),
                    ];
                case 2:
                    accessToken = _a.sent();
                    if (accessToken) {
                        res.setHeader('x-access-token', accessToken);
                    }
                    userId = user.id;
                    body = req.body;
                    return [
                        4 /*yield*/,
                        (0, visitor_service_1.createVisitor)(
                            __assign(__assign({}, body), { user: userId })
                        ),
                    ];
                case 3:
                    visitor = _a.sent();
                    return [
                        4 /*yield*/,
                        (0, basket_service_1.createBasket)({
                            user: user,
                            visitor: visitor,
                            coins_left: 100,
                            products: [],
                            confirmed: false,
                        }),
                    ];
                case 4:
                    visitorBasket = _a.sent();
                    return [
                        4 /*yield*/,
                        (0, performance_service_1.findPerformance)({
                            performanceId: body.performance,
                        }),
                    ];
                case 5:
                    performance_1 = _a.sent();
                    return [
                        4 /*yield*/,
                        (0, visitor_service_1.findAndUpdateVisitor)(
                            { _id: visitor._id },
                            {
                                basket: visitorBasket,
                                performance: performance_1,
                            },
                            {
                                new: true,
                            }
                        ),
                    ];
                case 6:
                    visitor = _a.sent();
                    return [
                        4 /*yield*/,
                        (0, performance_service_1.findAndUpdatePerformance)(
                            { performanceId: body.performance },
                            {
                                visitors: __spreadArray(
                                    __spreadArray(
                                        [],
                                        performance_1.visitors,
                                        true
                                    ),
                                    [visitor._id],
                                    false
                                ),
                            },
                            {
                                new: true,
                            }
                        ),
                    ];
                case 7:
                    _a.sent();
                    // console.log('i created this visitor', visitor);
                    visitor.accessToken = accessToken; // just in case
                    return [2 /*return*/, res.send(visitor)];
                case 8:
                    e_1 = _a.sent();
                    console.error(e_1);
                    return [3 /*break*/, 9];
                case 9:
                    return [2 /*return*/];
            }
        });
    });
}
exports.createVisitorHandler = createVisitorHandler;
function updateVisitorColorsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [
                        4 /*yield*/,
                        (0, visitor_service_1.confirmVisitorColors)(req.body),
                    ];
                case 1:
                    _a.sent();
                    return [2 /*return*/, res.sendStatus(204)];
                case 2:
                    e_2 = _a.sent();
                    console.error(e_2);
                    return [2 /*return*/, res.sendStatus(400)];
                case 3:
                    return [2 /*return*/];
            }
        });
    });
}
exports.updateVisitorColorsHandler = updateVisitorColorsHandler;
function archiveVisitorsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // console.log('trying to archive vistiors');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, archiveVisitors(req.body)];
                case 2:
                    _a.sent();
                    // console.log(req.body);
                    return [2 /*return*/, res.sendStatus(204)];
                case 3:
                    e_3 = _a.sent();
                    console.error(e_3);
                    return [2 /*return*/, res.sendStatus(400)];
                case 4:
                    return [2 /*return*/];
            }
        });
    });
}
exports.archiveVisitorsHandler = archiveVisitorsHandler;
function archiveVisitors(update) {
    return __awaiter(this, void 0, void 0, function () {
        var e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    // console.log('update:', update);
                    return [
                        4 /*yield*/,
                        visitor_model_1.default.updateMany(
                            { performance: update._id },
                            { archived: true }
                        ),
                    ];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_4 = _a.sent();
                    console.error(e_4);
                    return [3 /*break*/, 3];
                case 3:
                    return [2 /*return*/];
            }
        });
    });
}
exports.archiveVisitors = archiveVisitors;
function updateVisitorHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var visitorId,
            update,
            visitor,
            addQuizResults,
            quizResults,
            _i,
            quizResults_1,
            qr,
            result,
            result,
            updatedVisitor,
            e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 10]);
                    visitorId = req.params.visitorId;
                    update = req.body;
                    return [
                        4 /*yield*/,
                        (0, visitor_service_1.findVisitor)({
                            visitorId: visitorId,
                        }),
                    ];
                case 1:
                    visitor = _a.sent();
                    if (!visitor) {
                        return [2 /*return*/, res.sendStatus(404)];
                    }
                    addQuizResults = [];
                    if (!update.quiz_results) return [3 /*break*/, 7];
                    quizResults = update.quiz_results;
                    // console.log(quizResults);
                    (_i = 0), (quizResults_1 = quizResults);
                    _a.label = 2;
                case 2:
                    if (!(_i < quizResults_1.length)) return [3 /*break*/, 7];
                    qr = quizResults_1[_i];
                    // console.log(
                        'QUIZ RESULT QUIZ RESULT ------------------',
                        qr
                    );
                    // console.log(qr._id);
                    if (!(qr._id == null)) return [3 /*break*/, 4];
                    return [
                        4 /*yield*/,
                        quiz_results_model_1.default.create(
                            __assign(__assign({}, qr), {
                                visitor: visitor,
                                result_humanity_values: {
                                    lime: 0,
                                    fuchsia: 0,
                                    silver: 0,
                                    turq: 0,
                                },
                            })
                        ),
                    ];
                case 3:
                    result = _a.sent();
                    // console.log(result);
                    addQuizResults.push(result);
                    return [3 /*break*/, 6];
                case 4:
                    return [
                        4 /*yield*/,
                        quiz_results_model_1.default.findByIdAndUpdate(
                            { _id: qr._id },
                            qr
                        ),
                    ];
                case 5:
                    result = _a.sent();
                    addQuizResults.push(result);
                    // console.log('SHOULD HAVE UPDATED', result);
                    _a.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 2];
                case 7:
                    return [
                        4 /*yield*/,
                        (0, visitor_service_1.findAndUpdateVisitor)(
                            { visitorId: visitorId },
                            __assign(__assign({}, update), {
                                quiz_results: addQuizResults,
                            }),
                            {
                                new: true,
                            }
                        ),
                    ];
                case 8:
                    updatedVisitor = _a.sent();
                    return [2 /*return*/, res.send(updatedVisitor)];
                case 9:
                    e_5 = _a.sent();
                    console.error(e_5);
                    return [2 /*return*/, res.sendStatus(400)];
                case 10:
                    return [2 /*return*/];
            }
        });
    });
}
exports.updateVisitorHandler = updateVisitorHandler;
function getVisitorHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var visitorId, visitor, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    visitorId = req.params.visitorId;
                    return [
                        4 /*yield*/,
                        (0, visitor_service_1.findVisitor)({
                            visitorId: visitorId,
                        }),
                    ];
                case 1:
                    visitor = _a.sent();
                    if (!visitor) {
                        return [2 /*return*/, res.sendStatus(404)];
                    }
                    return [2 /*return*/, res.send(visitor)];
                case 2:
                    err_1 = _a.sent();
                    console.error(err_1);
                    return [2 /*return*/, res.sendStatus(400)];
                case 3:
                    return [2 /*return*/];
            }
        });
    });
}
exports.getVisitorHandler = getVisitorHandler;
function getPerformanceVisitorsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var visitors, e_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    // console.log(req.params);
                    return [
                        4 /*yield*/,
                        (0, visitor_service_1.getAllVisitors)({
                            performance: req.params.performance,
                        }),
                    ];
                case 1:
                    visitors = _a.sent();
                    if (!visitors) {
                        return [2 /*return*/, res.sendStatus(404)];
                    }
                    return [2 /*return*/, res.send(visitors)];
                case 2:
                    e_6 = _a.sent();
                    console.error(e_6);
                    return [2 /*return*/, res.sendStatus(400)];
                case 3:
                    return [2 /*return*/];
            }
        });
    });
}
exports.getPerformanceVisitorsHandler = getPerformanceVisitorsHandler;
function getVisitorsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var visitors, e_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [
                        4 /*yield*/,
                        (0, visitor_service_1.getAllVisitors)({}),
                    ];
                case 1:
                    visitors = _a.sent();
                    if (!visitors) {
                        return [2 /*return*/, res.sendStatus(404)];
                    }
                    return [2 /*return*/, res.send(visitors)];
                case 2:
                    e_7 = _a.sent();
                    console.error(e_7);
                    return [2 /*return*/, res.sendStatus(400)];
                case 3:
                    return [2 /*return*/];
            }
        });
    });
}
exports.getVisitorsHandler = getVisitorsHandler;
function deleteVisitorHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, visitorId, visitor, e_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    userId = res.locals.user._id;
                    visitorId = req.params.visitorId;
                    return [
                        4 /*yield*/,
                        (0, visitor_service_1.findVisitor)({
                            visitorId: visitorId,
                        }),
                    ];
                case 1:
                    visitor = _a.sent();
                    if (!visitor) {
                        return [2 /*return*/, res.sendStatus(404)];
                    }
                    if (String(visitor.user) !== userId) {
                        return [2 /*return*/, res.sendStatus(403)];
                    }
                    return [
                        4 /*yield*/,
                        (0, visitor_service_1.deleteVisitor)({
                            visitorId: visitorId,
                        }),
                    ];
                case 2:
                    _a.sent();
                    return [2 /*return*/, res.sendStatus(200)];
                case 3:
                    e_8 = _a.sent();
                    console.error(e_8);
                    return [2 /*return*/, res.sendStatus(400)];
                case 4:
                    return [2 /*return*/];
            }
        });
    });
}
exports.deleteVisitorHandler = deleteVisitorHandler;
