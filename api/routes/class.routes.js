"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassRoutes = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const class_controller_1 = require("../controller/class.controller");
function ClassRoutes(app) {
    const router = (0, express_1.Router)();
    router.post('/', auth_1.adminAuth, class_controller_1.ClassController.create);
    router.put('/status', auth_1.adminAuth, class_controller_1.ClassController.updateStatus);
    router.delete('/:_id', auth_1.adminAuth, class_controller_1.ClassController.markDelete);
    router.get('/search', class_controller_1.ClassController.search);
    router.get('/:_id', class_controller_1.ClassController.getById);
    app.use('/api/class', router);
}
exports.ClassRoutes = ClassRoutes;
