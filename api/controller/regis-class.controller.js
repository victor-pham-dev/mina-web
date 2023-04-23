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
exports.RegisClassController = void 0;
const common_1 = require("../const/common");
const response_handler_1 = require("../helper/response-handler");
const regis_class_validator_1 = require("../validator/regis-class.validator");
const regis_class_repositories_1 = require("../repositories/regis-class.repositories");
const class_repositories_1 = require("../repositories/class.repositories");
// create regis class info
function regis(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const bodyValid = regis_class_validator_1.regisClassValidator.regis(req.body);
        if (!bodyValid.valid) {
            return (0, response_handler_1.sendRes)({
                res,
                code: common_1.CODE.FAILED,
                msg: `Invalid ${bodyValid.msg.toString()}`,
                data: null,
            });
        }
        try {
            const classExisted = yield class_repositories_1.ClassRepositories.get(req.body.classId);
            if (!classExisted || classExisted.data.status !== common_1.CLASS_STATUS.OPEN) {
                return (0, response_handler_1.sendRes)({
                    res,
                    code: common_1.CODE.FAILED,
                    msg: 'Class is not open',
                    data: null,
                });
            }
            const createResult = yield regis_class_repositories_1.RegisClassRepositories.create(Object.assign(Object.assign({}, req.body), { deleted: false, status: common_1.REGIS_STATUS.INIT }));
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
            throw new Error(`regis new class error ${error}`);
        }
    });
}
function updateStatus(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.body._id || !req.body.status) {
            return (0, response_handler_1.sendRes)({
                res,
                code: common_1.CODE.FAILED,
                msg: common_1.MSG.MISSING_PARAMS,
                data: null,
            });
        }
        try {
            const regisData = yield regis_class_repositories_1.RegisClassRepositories.get(req.body._id);
            if (regisData.ok) {
                const updateResult = yield regis_class_repositories_1.RegisClassRepositories.patch(req.body._id, {
                    status: req.body.status,
                });
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
            throw new Error(`change status regis class error: ${error}`);
        }
    });
}
// change status
function markDelete(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const _id = req.params._id;
        try {
            const updateResult = yield regis_class_repositories_1.RegisClassRepositories.patch(_id, { deleted: true });
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
        catch (error) {
            throw new Error(`change status regis class error: ${error}`);
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
            const result = yield regis_class_repositories_1.RegisClassRepositories.search({
                filter: filter,
                page: (_a = Number(query.page)) !== null && _a !== void 0 ? _a : 1,
                pageSize: (_b = Number(query.pageSize)) !== null && _b !== void 0 ? _b : 10,
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
            throw new Error(`regis-Class:controller: ${error}`);
        }
    });
}
// async function getById(req: Request, res: Response) {
//   const _id = req.params._id as string
//   try {
//     const result = await ClassRepositories.get(_id)
//     if (result.ok) {
//       return sendRes<ClassProps>({
//         res,
//         code: CODE.OK,
//         msg: MSG.OK,
//         data: result.data,
//       })
//     }
//     return sendRes<null>({
//       res,
//       code: CODE.NOT_FOUND,
//       msg: `CLASS NOT FOUND`,
//       data: null,
//     })
//   } catch (error) {
//     throw new Error(`class: get by id error: ${error}`)
//   }
// }
exports.RegisClassController = {
    regis,
    updateStatus,
    markDelete,
    search,
};
