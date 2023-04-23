"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionRoutes = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const question_controller_1 = require("../controller/question.controller");
function QuestionRoutes(app) {
    const router = (0, express_1.Router)();
    router.post('/', auth_1.adminAuth, question_controller_1.QuestionController.create);
    // router.patch('/status', adminAuth, ClassController.updateStatus)
    //   router.delete('/:_id', adminAuth, ClassController.markDelete)
    router.get('/test', question_controller_1.QuestionController.getTestQuestions);
    //   router.get('/id=:_id', ClassController.getById)
    app.use('/api/question', router);
}
exports.QuestionRoutes = QuestionRoutes;
