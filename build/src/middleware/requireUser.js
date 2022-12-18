"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var requireUser = function (req, res, next) {
    // it always exists after every request on res.locals, very cool
    var user = res.locals.user;
    console.log('require user/');
    if (!user) {
        console.log('i sent the 403');
        return res.sendStatus(403);
    }
    console.log('requireuser user: ', user);
    return next();
};
exports.default = requireUser;
