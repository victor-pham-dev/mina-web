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
function patch(_id, newValue) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
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
            throw new Error(`repositories-post:patch error: ${error}`);
        }
    });
}
function search({ filter, page, pageSize, }) {
    return __awaiter(this, void 0, void 0, function* () {
        //console.log('repo:post', filter)
        const fields = {
            content: 0,
        };
        try {
            const currentPage = (page - 1) * pageSize;
            const query = yield Posts.find(filter, Object.assign({}, fields))
                .sort({ createdAt: -1 })
                .skip(currentPage)
                .limit(pageSize);
            const totalCount = yield Posts.find(filter).countDocuments();
            let data = {};
            if (query && totalCount) {
                data = {
                    dataTable: query,
                    paging: {
                        page: page,
                        pageSize: pageSize,
                    },
                    totalCount: totalCount,
                };
            }
            return {
                ok: true,
                data,
            };
        }
        catch (error) {
            throw new Error(`repositories-post:search error: ${error}`);
        }
    });
}
function getRelated(currentId, type) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield Posts.find({
                _id: { $ne: currentId },
                type,
            }, { content: 0 }).limit(4);
            return {
                ok: true,
                data: result !== null && result !== void 0 ? result : [],
            };
        }
        catch (error) {
            throw new Error(`repositories-post: related error`);
        }
    });
}
exports.PostRepositories = {
    create,
    patch,
    get,
    search,
    getRelated,
};
