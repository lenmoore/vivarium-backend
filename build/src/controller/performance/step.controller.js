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
Object.defineProperty(exports, '__esModule', { value: true });
exports.deleteStepHandler =
    exports.getStepsHandler =
    exports.getStepHandler =
    exports.updateStepHandler =
    exports.createStepHandler =
        void 0;
var step_service_1 = require('../../service/performance/step.service');
function createStepHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var body, Step;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = req.body;
                    return [
                        4 /*yield*/,
                        (0, step_service_1.createStep)(__assign({}, body)),
                    ];
                case 1:
                    Step = _a.sent();
                    return [2 /*return*/, res.send(Step)];
            }
        });
    });
}
exports.createStepHandler = createStepHandler;
function updateStepHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var stepId, update, step, updatedStep;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    stepId = req.params.stepId;
                    update = req.body;
                    return [
                        4 /*yield*/,
                        (0, step_service_1.findStep)({ stepId: stepId }),
                    ];
                case 1:
                    step = _a.sent();
                    if (!step) {
                        return [2 /*return*/, res.sendStatus(404)];
                    }
                    return [
                        4 /*yield*/,
                        (0, step_service_1.findAndUpdateStep)(
                            { stepId: stepId },
                            update,
                            {
                                new: true,
                            }
                        ),
                    ];
                case 2:
                    updatedStep = _a.sent();
                    return [2 /*return*/, res.send(updatedStep)];
            }
        });
    });
}
exports.updateStepHandler = updateStepHandler;
function getStepHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var stepId, step;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // console.log('req.params >>>>>> ', req.params);
                    stepId = req.params.stepId;
                    return [
                        4 /*yield*/,
                        (0, step_service_1.findStep)({ _id: stepId }),
                    ];
                case 1:
                    step = _a.sent();
                    if (!step) {
                        return [2 /*return*/, res.sendStatus(404)];
                    }
                    return [2 /*return*/, res.send(step)];
            }
        });
    });
}
exports.getStepHandler = getStepHandler;
function getStepsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var steps;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    return [4 /*yield*/, (0, step_service_1.getAllSteps)()];
                case 1:
                    steps = _a.sent();
                    if (!steps) {
                        return [2 /*return*/, res.sendStatus(404)];
                    }
                    return [2 /*return*/, res.send(steps)];
            }
        });
    });
}
exports.getStepsHandler = getStepsHandler;
function deleteStepHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var stepId, step;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    stepId = req.params.stepId;
                    return [
                        4 /*yield*/,
                        (0, step_service_1.findStep)({ stepId: stepId }),
                    ];
                case 1:
                    step = _a.sent();
                    // console.log(step);
                    if (!step) {
                        return [2 /*return*/, res.sendStatus(404)];
                    }
                    return [
                        4 /*yield*/,
                        (0, step_service_1.deleteStep)({ step: step }),
                    ];
                case 2:
                    _a.sent();
                    return [2 /*return*/, res.sendStatus(200)];
            }
        });
    });
}
exports.deleteStepHandler = deleteStepHandler;
