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
exports.ClassRepositories = void 0;
const model_index_1 = require("../models/model.index");
const common_repositories_1 = require("./common.repositories");
const Classes = model_index_1.database.classes;
function create(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield Classes.create(payload);
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
            throw new Error(`repositories-class:Create error: ${error}`);
        }
    });
}
function get(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield Classes.findById(_id);
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
            throw new Error(`repositories-class:Get error: ${error}`);
        }
    });
}
function patch(_id, newValue) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield Classes.findOneAndUpdate({ _id }, newValue);
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
            throw new Error(`repositories-class:patch error: ${error}`);
        }
    });
}
function search({ filter, page, pageSize, }) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('repo:class', filter);
        try {
            const result = yield (0, common_repositories_1.Searcher)(Classes, filter, page, pageSize);
            return {
                ok: true,
                data: result.data,
            };
        }
        catch (error) {
            throw new Error(`repositories-class:Get error: ${error}`);
        }
    });
}
exports.ClassRepositories = {
    create,
    patch,
    get,
    search,
};
