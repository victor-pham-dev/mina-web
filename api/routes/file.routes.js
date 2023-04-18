"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { commonAuth } = require('../middleware/auth');
module.exports = (app) => {
    const files = require('../controller/file.controller');
    var router = require('express').Router();
    router.post('/', files.SingleUpload);
    router.get('/:imageName', files.getFile);
    app.use('/api/file', commonAuth, router);
};
