"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonRoutes = void 0;
const express_1 = require("express");
const common_controller_1 = require("../controller/common.controller");
const auth_1 = require("../middleware/auth");
const CommonRoutes = (app) => {
    const router = (0, express_1.Router)();
    router.get('/', (req, res) => {
        res.send('Welcome to mina');
    });
    router.post('/send-mail', auth_1.adminAuth, common_controller_1.CommonController.Mailer);
    router.post('/file/', auth_1.adminAuth, common_controller_1.CommonController.SingleUpload);
    router.get('/file/:imageName', common_controller_1.CommonController.getImageByName);
    app.use('/api', router);
};
exports.CommonRoutes = CommonRoutes;
