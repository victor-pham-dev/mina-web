"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisClassRoutes = void 0;
const express_1 = require("express");
const regis_class_controller_1 = require("../controller/regis-class.controller");
const auth_1 = require("../middleware/auth");
function RegisClassRoutes(app) {
    const router = (0, express_1.Router)();
    router.post('/', regis_class_controller_1.RegisClassController.regis);
    router.put('/status', auth_1.adminAuth, regis_class_controller_1.RegisClassController.updateStatus);
    router.delete('/:id', auth_1.adminAuth, regis_class_controller_1.RegisClassController.markDelete);
    app.use('/api/regis-class', router);
}
exports.RegisClassRoutes = RegisClassRoutes;
