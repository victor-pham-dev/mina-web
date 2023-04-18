"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const user_controller_1 = require("../controller/user.controller");
const userRoutes = (app) => {
    const router = (0, express_1.Router)();
    router.post('/', user_controller_1.UserController.Register);
    router.post('/login/account', user_controller_1.UserController.LoginWithAccount);
    router.get('/auth', auth_1.commonAuth, user_controller_1.UserController.Auth);
    app.use('/api/user', router);
};
exports.userRoutes = userRoutes;
