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
            throw new Error(`post:change status error: ${error}`);
        }
    });
}
// checking regis
function update(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const regisData = post_repositories_1.PostRepositories.get(req.body._id);
            if (regisData) {
                const updateResult = yield post_repositories_1.PostRepositories.patch(req.body);
                if (updateResult) {
                    return (0, response_handler_1.sendRes)({
                        res,
                        code: common_1.CODE.OK,
                        msg: common_1.MSG.UPDATED,
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
            throw new Error(`post:change status error: ${error}`);
        }
    });
}
// change status
function markDelete(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const _id = req.params._id;
        try {
            const regisData = yield post_repositories_1.PostRepositories.get(_id);
            if (regisData.ok) {
                const updateResult = yield post_repositories_1.PostRepositories.put(_id, 'deleted', true);
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
exports.PostController = {
    create,
    update,
    markDelete,
    getOne,
};
