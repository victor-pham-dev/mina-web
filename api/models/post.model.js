"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_timestamp_1 = __importDefault(require("mongoose-timestamp"));
const PostSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    cardImg: {
        type: String,
        required: true,
    },
    author: {
        id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
    },
    content: {
        type: String,
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
});
PostSchema.plugin(mongoose_timestamp_1.default);
exports.PostModel = mongoose_1.default.model('posts', PostSchema);
