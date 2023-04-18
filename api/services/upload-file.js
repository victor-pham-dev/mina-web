"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const common_1 = require("../const/common");
const data_convert_1 = require("../helper/data-convert");
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + (0, data_convert_1.removeSpecialChars)(file.originalname));
    },
});
const fileFilter = (req, file, cb) => {
    // validate kiểu file
    if (common_1.FILE.ACCEPT.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error(` Chỉ chấp nhận các file : ${common_1.FILE.ACCEPT.toString()}`), false);
    }
};
const uploader = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: common_1.FILE.SIZE,
    },
    fileFilter: fileFilter,
});
exports.default = uploader;
