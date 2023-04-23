"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_timestamp_1 = __importDefault(require("mongoose-timestamp"));
const StudentSchema = new mongoose_1.default.Schema({
    regisId: {
        type: String,
        required: true,
    },
    classId: {
        type: String,
        required: true,
    },
    deleted: {
        type: Boolean,
        required: true,
    },
});
StudentSchema.plugin(mongoose_timestamp_1.default);
exports.StudentModel = mongoose_1.default.model('students', StudentSchema);
