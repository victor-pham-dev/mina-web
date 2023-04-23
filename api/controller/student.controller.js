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
exports.StudentController = void 0;
const common_1 = require("../const/common");
const response_handler_1 = require("../helper/response-handler");
const student_validator_1 = require("../validator/student.validator");
const student_repositories_1 = require("../repositories/student.repositories");
// create regis class info
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const bodyValid = student_validator_1.StudentValidator.create(req.body);
        if (!bodyValid.valid) {
            return (0, response_handler_1.sendRes)({
                res,
                code: common_1.CODE.FAILED,
                msg: `Invalid ${bodyValid.msg.toString()}`,
                data: null,
            });
        }
        try {
            // const createLog: LogProps = {
            //   time: new Date().toLocaleString(),
            //   content: 'created',
            // }
            const createResult = yield student_repositories_1.StudentRepositories.create(Object.assign(Object.assign({}, req.body), { deleted: false }));
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
            throw new Error(`student:create error ${error}`);
        }
    });
}
// checking regis
// interface updateStatusProps {
//   _id: string
//   status: CLASS_STATUS.OPEN | CLASS_STATUS.PROCESSING | CLASS_STATUS.END
// }
// async function updateStatus(req: RequestCustoms<updateStatusProps>, res: Response) {
//   try {
//     const regisData = await ClassRepositories.get(req.body._id)
//     if (regisData.ok) {
//       const updateResult = await ClassRepositories.patch(req.body._id, { status: req.body.status })
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
//     }
//     return sendRes<null>({
//       res,
//       code: CODE.NOT_FOUND,
//       msg: `REGIS DATA NOT FOUND`,
//       data: null,
//     })
//   } catch (error) {
//     throw new Error(`class:change status error: ${error}`)
//   }
// }
// // change status
// async function markDelete(req: Request, res: Response) {
//   const _id = req.params._id as string
//   try {
//     const classData = await ClassRepositories.get(_id)
//     if (classData.ok) {
//       const updateResult = await ClassRepositories.patch(_id, { deleted: true })
//       if (updateResult) {
//         return sendRes<null>({
//           res,
//           code: CODE.OK,
//           msg: MSG.DELETED,
//           data: null,
//         })
//       }
//       return sendRes<null>({
//         res,
//         code: CODE.FAILED,
//         msg: MSG.NOT_FOUND,
//         data: null,
//       })
//     }
//     return sendRes<null>({
//       res,
//       code: CODE.NOT_FOUND,
//       msg: `REGIS DATA NOT FOUND`,
//       data: null,
//     })
//   } catch (error) {
//     throw new Error(`class: delete error: ${error}`)
//   }
// }
// // SearchClassParamsProps
function search(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const query = req.query;
        try {
            let filter = {
                deleted: false,
            };
            if (query.classId !== undefined && query.classId !== null) {
                filter.classId = query.classId.toString();
            }
            const result = yield student_repositories_1.StudentRepositories.search({
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
            throw new Error(`Student:controller: ${error}`);
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
exports.StudentController = {
    create,
    search,
};
