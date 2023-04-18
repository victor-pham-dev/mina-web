"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_timestamp_1 = __importDefault(require("mongoose-timestamp"));
const regexp_1 = require("../const/regexp");
const UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    facebookId: {
        type: String,
        required: false,
    },
    avatar: {
        type: String,
        required: false,
    },
    gender: {
        type: String,
        required: true,
    },
    yOB: {
        type: Number,
        required: true,
    },
    status: {
        type: Number,
        required: true,
    },
    deleted: {
        type: Boolean,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return regexp_1.REGEX.EMAIL.test(value);
            },
            message: 'Invalid email format',
        },
    },
});
UserSchema.plugin(mongoose_timestamp_1.default);
exports.UserModel = mongoose_1.default.model('users', UserSchema);
