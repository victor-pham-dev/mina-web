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
exports.ClassController = void 0;
const common_1 = require("../const/common");
const response_handler_1 = require("../helper/response-handler");
const class_validator_1 = require("../validator/class.validator");
const class_repositories_1 = require("../repositories/class.repositories");
// create regis class info
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const bodyValid = class_validator_1.ClassValidator.create(req.body);
        if (!bodyValid.valid) {
            return (0, response_handler_1.sendRes)({
                res,
                code: common_1.CODE.FAILED,
                msg: `Invalid ${bodyValid.msg.toString()}`,
                data: null,
            });
        }
        try {
            const createLog = {
                time: new Date().toLocaleString(),
                content: 'created',
            };
            const createResult = yield class_repositories_1.ClassRepositories.create(Object.assign(Object.assign({}, req.body), { deleted: false, recruiting: true, numberOfStudents: 0, logs: [createLog], status: common_1.CLASS_STATUS.OPEN }));
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
            throw new Error(`class:create error ${error}`);
        }
    });
}
function updateStatus(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const regisData = yield class_repositories_1.ClassRepositories.get(req.body._id);
            if (regisData.ok) {
                const updateResult = yield class_repositories_1.ClassRepositories.patch(req.body._id, { status: req.body.status });
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
                msg: `REGIS DATA NOT FOUND`,
                data: null,
            });
        }
        catch (error) {
            throw new Error(`class:change status error: ${error}`);
        }
    });
}
// change status
function markDelete(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const _id = req.params._id;
        try {
            const classData = yield class_repositories_1.ClassRepositories.get(_id);
            if (classData.ok) {
                const updateResult = yield class_repositories_1.ClassRepositories.patch(_id, { deleted: true });
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
                msg: `REGIS DATA NOT FOUND`,
                data: null,
            });
        }
        catch (error) {
            throw new Error(`class: delete error: ${error}`);
        }
    });
}
// SearchClassParamsProps
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
            if (query.recruiting !== undefined && query.recruiting !== null) {
                filter.recruiting = Boolean(query.recruiting);
            }
            if (query.classLevel !== undefined && query.classLevel !== null) {
                filter.classLevel = query.classLevel.toString();
            }
            const result = yield class_repositories_1.ClassRepositories.search({
                filter: filter,
                page: (_a = Number(query.page)) !== null && _a !== void 0 ? _a : 1,
                pageSize: (_b = Number(query.pageSize)) !== null && _b !== void 0 ? _b : 9,
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
            throw new Error(`Class:controller: ${error}`);
        }
    });
}
function getById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const _id = req.params._id;
        try {
            const result = yield class_repositories_1.ClassRepositories.get(_id);
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
                msg: `CLASS NOT FOUND`,
                data: null,
            });
        }
        catch (error) {
            throw new Error(`class: get by id error: ${error}`);
        }
    });
}
exports.ClassController = {
    create,
    updateStatus,
    markDelete,
    search,
    getById,
};
