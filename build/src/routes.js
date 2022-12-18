"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = __importDefault(require("cors"));
var user_controller_1 = require("./controller/user.controller");
var validateResource_1 = __importDefault(require("./middleware/validateResource"));
var user_schema_1 = require("./schema/user.schema");
var session_schema_1 = require("./schema/session.schema");
var auth_controller_1 = require("./controller/auth.controller");
var requireUser_1 = __importDefault(require("./middleware/requireUser"));
var product_controller_1 = require("./controller/humanity-shop/product.controller");
var product_schema_1 = require("./schema/humanity-shop/product.schema");
var basket_schema_1 = require("./schema/humanity-shop/basket.schema");
var basket_controller_1 = require("./controller/humanity-shop/basket.controller");
var performance_schema_1 = require("./schema/performance/performance.schema");
var performance_controller_1 = require("./controller/performance/performance.controller");
var data_vis_controller_1 = require("./controller/humanity-shop/data-vis-controller");
var visitor_schema_1 = require("./schema/performance/visitor.schema");
var visitor_controller_1 = require("./controller/performance/visitor.controller");
var phase_schema_1 = require("./schema/performance/phase.schema");
var phase_controller_1 = require("./controller/performance/phase.controller");
var game_schema_1 = require("./schema/performance/game.schema");
var game_controller_1 = require("./controller/performance/game.controller");
function routes(app) {
    app.route('/').get(function (req, res) {
        res.sendFile(process.cwd() + '/index.html');
    });
    app.get('/api/health-check', (0, cors_1.default)(), function (req, res) {
        console.log('yo');
        console.log('im hot reload');
        res.sendStatus(200);
    });
    app.get('/api/products-vis', (0, cors_1.default)(), function (req, res) {
        console.log('yo');
        (0, data_vis_controller_1.getDataVisInfo)(req, res);
    });
    app.get('/api/users/me', user_controller_1.getCurrentUserHandler);
    app.post('/api/users', (0, cors_1.default)(), (0, validateResource_1.default)(user_schema_1.createUserSchema), user_controller_1.createUserHandler);
    app.options('/api/sessions', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.sendStatus(204);
    });
    app.post('/api/sessions', (0, validateResource_1.default)(session_schema_1.createSessionSchema), auth_controller_1.createSessionHandler);
    app.post('/api/sessions/refresh', auth_controller_1.refreshAccessTokenHandler);
    //    -------------------- admin stuff
    //    products
    app.post('/api/products', [requireUser_1.default, (0, validateResource_1.default)(product_schema_1.createProductSchema)], product_controller_1.createProductHandler);
    app.get('/api/products', product_controller_1.getProductsHandler);
    app.get('/api/products/:productId', (0, validateResource_1.default)(product_schema_1.getProductSchema), product_controller_1.getProductHandler);
    app.put('/api/products/:productId', [(0, validateResource_1.default)(product_schema_1.updateProductSchema)], product_controller_1.updateProductHandler);
    app.delete('/api/products/:productId', [requireUser_1.default, (0, validateResource_1.default)(product_schema_1.deleteProductSchema)], product_controller_1.deleteProductHandler);
    // ------ performances
    app.post('/api/performances', [requireUser_1.default, (0, validateResource_1.default)(performance_schema_1.createPerformanceSchema)], performance_controller_1.createPerformanceHandler);
    app.get('/api/performances', performance_controller_1.getPerformancesHandler);
    app.get('/api/performances/:performanceId', (0, validateResource_1.default)(performance_schema_1.getPerformanceSchema), performance_controller_1.getPerformanceHandler);
    app.put('/api/performances/:performanceId', [requireUser_1.default, (0, validateResource_1.default)(performance_schema_1.updatePerformanceSchema)], performance_controller_1.updatePerformanceHandler);
    app.delete('/api/performances/:performanceId', [requireUser_1.default, (0, validateResource_1.default)(performance_schema_1.deletePerformanceSchema)], performance_controller_1.deletePerformanceHandler);
    // --- phases
    app.post('/api/phases', [requireUser_1.default, (0, validateResource_1.default)(phase_schema_1.createPhaseSchema)], phase_controller_1.createPhaseHandler);
    app.get('/api/phases', phase_controller_1.getPhasesHandler);
    app.get('/api/phases/:phaseId', (0, validateResource_1.default)(phase_schema_1.getPhaseSchema), phase_controller_1.getPhaseHandler);
    app.put('/api/phases/:phaseId', [requireUser_1.default, (0, validateResource_1.default)(phase_schema_1.updatePhaseSchema)], phase_controller_1.updatePhaseHandler);
    app.delete('/api/phases/:phaseId', [requireUser_1.default, (0, validateResource_1.default)(phase_schema_1.deletePhaseSchema)], performance_controller_1.deletePerformanceHandler);
    // --- end phases
    // --- games
    app.post('/api/games', [requireUser_1.default, (0, validateResource_1.default)(game_schema_1.createGameSchema)], game_controller_1.createGameHandler);
    app.get('/api/games', game_controller_1.getGamesHandler);
    app.get('/api/games/:gameId', (0, validateResource_1.default)(game_schema_1.getGameSchema), game_controller_1.getGameHandler);
    app.put('/api/games/:gameId', [requireUser_1.default, (0, validateResource_1.default)(game_schema_1.updateGameSchema)], game_controller_1.updateGameHandler);
    app.delete('/api/games/:gameId', [requireUser_1.default, (0, validateResource_1.default)(game_schema_1.deleteGameSchema)], game_controller_1.deleteGameHandler);
    // --- end games
    // --- visitors
    app.post('/api/visitors', [(0, validateResource_1.default)(visitor_schema_1.createVisitorSchema)], visitor_controller_1.createVisitorHandler);
    app.get('/api/performance-visitors/:performance', visitor_controller_1.getPerformanceVisitorsHandler);
    app.get('/api/visitors', visitor_controller_1.getVisitorsHandler);
    app.get('/api/visitors/:visitorId', (0, validateResource_1.default)(visitor_schema_1.getVisitorSchema), visitor_controller_1.getVisitorHandler);
    app.put('/api/performances/:id/archive-visitors', [requireUser_1.default], visitor_controller_1.archiveVisitorsHandler);
    app.put('/api/visitors/:visitorId', [(0, validateResource_1.default)(visitor_schema_1.updateVisitorSchema)], visitor_controller_1.updateVisitorHandler);
    // app.put(
    //     '/api/visitors/:visitorId/quiz-results/:stepId',
    //     updateVisitorStepsHandler
    // );
    app.put('/api/visitors-update/colors', visitor_controller_1.updateVisitorColorsHandler);
    app.delete('/api/visitors/:visitorId', [requireUser_1.default, (0, validateResource_1.default)(visitor_schema_1.deleteVisitorSchema)], visitor_controller_1.deleteVisitorHandler);
    // -- end visitors
    //    ----------------------- regular stuff
    app.post('/api/baskets', [requireUser_1.default, (0, validateResource_1.default)(basket_schema_1.createBasketSchema)], basket_controller_1.createBasketHandler);
    app.get('/api/baskets/:basketId', (0, validateResource_1.default)(basket_schema_1.getBasketSchema), basket_controller_1.getBasketHandler);
    app.get('/api/baskets/visitor/:visitorId', (0, validateResource_1.default)(basket_schema_1.getBasketByVisitorSchema), basket_controller_1.getBasketByVisitorIdHandler);
    app.get('/api/baskets', basket_controller_1.getBasketsHandler);
    // todo restore requireUser
    app.put('/api/baskets/:basketId', [(0, validateResource_1.default)(basket_schema_1.updateBasketSchema)], basket_controller_1.updateBasketHandler);
    app.delete('/api/baskets/:basketId', [requireUser_1.default, (0, validateResource_1.default)(basket_schema_1.deleteBasketSchema)], basket_controller_1.deleteBasketHandler);
}
exports.default = routes;
