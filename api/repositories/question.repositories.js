"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionRepositories = void 0;
const model_index_1 = require("../models/model.index");
const Questions = model_index_1.database.questions;
function create(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield Questions.create(payload);
            if (result) {
                return {
                    ok: true,
                    data: result._id,
                };
            }
            return {
                ok: false,
                data: null,
            };
        }
        catch (error) {
            throw new Error(`repositories-question:Create error: ${error}`);
        }
    });
}
function getTestQuestions({ quantity, level, }) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('repo:question', quantity, level);
        try {
            const result = yield Questions.aggregate([
                { $match: { level: level, deleted: false } },
                { $sample: { size: quantity } },
                {
                    $project: {
                        _id: 1,
                        question: 1,
                        answers: 1,
                    },
                },
            ]);
            return {
                ok: true,
                data: result,
            };
        }
        catch (error) {
            throw new Error(`repositories-quesiton:get test error: ${error}`);
        }
    });
}
exports.QuestionRepositories = {
    create,
    getTestQuestions,
    // patch,
    // get,
    // search,
};
