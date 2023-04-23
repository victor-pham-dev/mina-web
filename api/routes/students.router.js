"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRoutes = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const student_controller_1 = require("../controller/student.controller");
function StudentRoutes(app) {
    const router = (0, express_1.Router)();
    router.post('/', auth_1.adminAuth, student_controller_1.StudentController.create);
    //   router.patch('/status', adminAuth, ClassController.updateStatus)
    //   router.delete('/:_id', adminAuth, ClassController.markDelete)
    router.get('/search', student_controller_1.StudentController.search);
    //   router.get('/:_id', ClassController.getById)
    app.use('/api/student', router);
}
exports.StudentRoutes = StudentRoutes;
