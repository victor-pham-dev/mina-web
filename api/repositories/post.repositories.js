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
exports.PostRepositories = void 0;
const model_index_1 = require("../models/model.index");
const Posts = model_index_1.database.posts;
function create(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield Posts.create(payload);
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
            throw new Error(`repositories-post:Create error: ${error}`);
        }
    });
}
function get(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield Posts.findById(_id);
            if (result) {
                return {
                    ok: true,
                    data: result,
                };
            }
            return {
                ok: false,
                data: null,
            };
        }
        catch (error) {
            throw new Error(`repositories-post:Get error: ${error}`);
        }
    });
}
function put(_id, key, value) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newValue = {
                [key]: value,
            };
            const result = yield Posts.findOneAndUpdate({ _id }, newValue);
            if (result) {
                return {
                    ok: true,
                    data: null,
                };
            }
            return {
                ok: false,
                data: null,
            };
        }
        catch (error) {
            throw new Error(`repositories-post:Put error: ${error}`);
        }
    });
}
function patch(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield Posts.findOneAndUpdate({ _id: payload._id }, { title: payload.title, content: payload.content, type: payload.type });
            if (result) {
                return {
                    ok: true,
                    data: null,
                };
            }
            return {
                ok: false,
                data: null,
            };
        }
        catch (error) {
            throw new Error(`repositories-post:Put error: ${error}`);
        }
    });
}
exports.PostRepositories = {
    create,
    patch,
    get,
    put,
};
