"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRoutes = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const post_controller_1 = require("../controller/post.controller");
function PostRoutes(app) {
    const router = (0, express_1.Router)();
    router.get('/:_id', post_controller_1.PostController.getOne);
    router.post('/', auth_1.adminAuth, post_controller_1.PostController.create);
    router.patch('/', auth_1.adminAuth, post_controller_1.PostController.update);
    router.delete('/:id', auth_1.adminAuth, post_controller_1.PostController.markDelete);
    app.use('/api/post', router);
}
exports.PostRoutes = PostRoutes;
