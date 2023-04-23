"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRoutes = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const post_controller_1 = require("../controller/post.controller");
function PostRoutes(app) {
    const router = (0, express_1.Router)();
    router.get('/search', post_controller_1.PostController.search);
    router.get('/id=:_id', post_controller_1.PostController.getOne);
    router.post('/', auth_1.adminAuth, post_controller_1.PostController.create);
    // router.patch('/', adminAuth, PostController.update)
    router.delete('/id=:id', auth_1.adminAuth, post_controller_1.PostController.markDelete);
    app.use('/api/post', router);
}
exports.PostRoutes = PostRoutes;
