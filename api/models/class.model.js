"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_timestamp_1 = __importDefault(require("mongoose-timestamp"));
const common_1 = require("../const/common");
const ClassSchema = new mongoose_1.default.Schema({
    classLevel: {
        type: String,
        required: true,
    },
    numberOfStudents: {
        type: Number,
        required: true,
    },
    cardImg: {
        type: String,
        required: true,
    },
    daysOfWeek: {
        type: Array,
        required: true,
    },
    schedule: {
        type: Array,
        required: true,
    },
    time: {
        type: Array,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    creatorId: {
        type: String,
        required: true,
    },
    teacher: {
        type: String,
        required: false,
        default: '',
    },
    status: {
        type: Number,
        required: true,
        default: common_1.CLASS_STATUS.OPEN,
    },
    recruiting: {
        type: Boolean,
        required: true,
        default: true,
    },
    logs: {
        type: String,
        required: true,
        default: '',
    },
    deleted: {
        type: Boolean,
        required: true,
        default: false,
    },
});
ClassSchema.plugin(mongoose_timestamp_1.default);
exports.ClassModel = mongoose_1.default.model('classes', ClassSchema);
