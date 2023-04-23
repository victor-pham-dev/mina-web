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
exports.PostController = void 0;
const common_1 = require("../const/common");
const response_handler_1 = require("../helper/response-handler");
const post_validator_1 = require("../validator/post.validator");
const post_repositories_1 = require("../repositories/post.repositories");
// create regis class info
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const bodyValid = post_validator_1.PostValidator.create(req.body);
        if (!bodyValid.valid) {
            return (0, response_handler_1.sendRes)({
                res,
                code: common_1.CODE.FAILED,
                msg: `Invalid ${bodyValid.msg.toString()}`,
                data: null,
            });
        }
        try {
            const createResult = yield post_repositories_1.PostRepositories.create(Object.assign(Object.assign({}, req.body), { deleted: false }));
            if (createResult.ok) {
                return (0, response_handler_1.sendRes)({
                    res,
                    code: common_1.CODE.CREATED,
                    msg: common_1.MSG.CREATED,
                    data: createResult.data,
                });
            }
            return (0, response_handler_1.sendRes)({
                res,
                code: common_1.CODE.FAILED,
                msg: `Create failed`,
                data: null,
            });
        }
        catch (error) {
            throw new Error(`post:create error ${error}`);
        }
    });
}
//get a post
function getOne(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const _id = req.params._id;
        if (!_id) {
            return (0, response_handler_1.sendRes)({
                res,
                code: common_1.CODE.FAILED,
                msg: common_1.MSG.NOT_FOUND,
                data: null,
            });
        }
        try {
            const findResult = yield post_repositories_1.PostRepositories.get(_id);
            if (findResult.ok) {
                return (0, response_handler_1.sendRes)({
                    res,
                    code: common_1.CODE.OK,
                    msg: common_1.MSG.OK,
                    data: findResult.data,
                });
            }
            return (0, response_handler_1.sendRes)({
                res,
                code: common_1.CODE.NOT_FOUND,
                msg: `Post NOT FOUND`,
                data: null,
            });
        }
        catch (error) {
            throw new Error(`post:get by id: ${error}`);
        }
    });
}
// checking regis
// interface
// async function update(req: RequestCustoms<PostProps>, res: Response) {
//   try {
//       const updateResult = await PostRepositories.patch(req.body.)
//       if (updateResult) {
//         return sendRes<null>({
//           res,
//           code: CODE.OK,
//           msg: MSG.UPDATED,
//           data: null,
//         })
//       }
//       return sendRes<null>({
//         res,
//         code: CODE.FAILED,
//         msg: MSG.NOT_FOUND,
//         data: null,
//       })
//   } catch (error) {
//     throw new Error(`post:change status error: ${error}`)
//   }
// }
// change status
function markDelete(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const _id = req.params._id;
        try {
            const regisData = yield post_repositories_1.PostRepositories.get(_id);
            if (regisData.ok) {
                const updateResult = yield post_repositories_1.PostRepositories.patch(_id, { deleted: true });
                if (updateResult) {
                    return (0, response_handler_1.sendRes)({
                        res,
                        code: common_1.CODE.OK,
                        msg: common_1.MSG.DELETED,
                        data: null,
                    });
                }
                return (0, response_handler_1.sendRes)({
                    res,
                    code: common_1.CODE.FAILED,
                    msg: common_1.MSG.NOT_FOUND,
                    data: null,
                });
            }
            return (0, response_handler_1.sendRes)({
                res,
                code: common_1.CODE.NOT_FOUND,
                msg: `Post NOT FOUND`,
                data: null,
            });
        }
        catch (error) {
            throw new Error(`post: delete error: ${error}`);
        }
    });
}
function search(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const query = req.query;
        try {
            let filter = {
                deleted: false,
            };
            if (query.status !== undefined && query.status !== null) {
                filter.status = Number(query.status);
            }
            if (query.type !== undefined && query.type !== null) {
                filter.type = query.type.toString();
            }
            if (query.title !== undefined && query.title !== null) {
                const regexString = query.title.toString().split(' ').join('.*');
                const regex = new RegExp(regexString, 'i');
                filter.title = { $regex: regex };
            }
            const result = yield post_repositories_1.PostRepositories.search({
                filter: filter,
                page: (_a = Number(query.page)) !== null && _a !== void 0 ? _a : 1,
                pageSize: (_b = Number(query.pageSize)) !== null && _b !== void 0 ? _b : 8,
            });
            if (result.ok) {
                return (0, response_handler_1.sendRes)({
                    res,
                    code: common_1.CODE.OK,
                    msg: common_1.MSG.OK,
                    data: result.data,
                });
            }
            return (0, response_handler_1.sendRes)({
                res,
                code: common_1.CODE.NOT_FOUND,
                msg: `QUERRY ERROR`,
                data: null,
            });
        }
        catch (error) {
            throw new Error(`Post:controller: ${error}`);
        }
    });
}
exports.PostController = {
    create,
    // update,
    markDelete,
    getOne,
    search,
};
