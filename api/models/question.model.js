"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_timestamp_1 = __importDefault(require("mongoose-timestamp"));
const QuestionSchema = new mongoose_1.default.Schema({
    question: {
        type: String,
        required: true,
    },
    answers: {
        type: [String],
        required: true,
    },
    level: {
        type: String,
        required: true,
    },
    deleted: {
        type: Boolean,
        required: true,
    },
});
QuestionSchema.plugin(mongoose_timestamp_1.default);
exports.QuestionModel = mongoose_1.default.model('questions', QuestionSchema);
