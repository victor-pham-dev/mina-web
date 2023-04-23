"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const db_config_1 = require("../config/db.config");
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("./user.model");
const class_model_1 = require("./class.model");
const regis_class_model_1 = require("./regis-class.model");
const student_model_1 = require("./student.model");
const question_model_1 = require("./question.model");
const post_model_1 = require("./post.model");
mongoose_1.default.Promise = global.Promise;
const database = {
    mongoose: mongoose_1.default,
    url: db_config_1.url,
    users: user_model_1.UserModel,
    regisclasses: regis_class_model_1.RegisClassModel,
    classes: class_model_1.ClassModel,
    posts: post_model_1.PostModel,
    students: student_model_1.StudentModel,
    questions: question_model_1.QuestionModel,
};
exports.database = database;
