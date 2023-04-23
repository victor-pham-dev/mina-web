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
exports.QuestionController = void 0;
const common_1 = require("../const/common");
const response_handler_1 = require("../helper/response-handler");
const question_validator_1 = require("../validator/question.validator");
const question_repositories_1 = require("../repositories/question.repositories");
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const bodyValid = question_validator_1.QuestionValidator.create(req.body);
        if (!bodyValid.valid) {
            return (0, response_handler_1.sendRes)({
                res,
                code: common_1.CODE.FAILED,
                msg: `Invalid ${bodyValid.msg.toString()}`,
                data: null,
            });
        }
        try {
            const createResult = yield question_repositories_1.QuestionRepositories.create(Object.assign(Object.assign({}, req.body), { deleted: false }));
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
            throw new Error(`question:create error ${error}`);
        }
    });
}
// //get a post
// async function getOne(req: Request, res: Response) {
//   const _id = req.params._id as string
//   if (!_id) {
//     return sendRes<null>({
//       res,
//       code: CODE.FAILED,
//       msg: MSG.NOT_FOUND,
//       data: null,
//     })
//   }
//   try {
//     const findResult = await PostRepositories.get(_id)
//     if (findResult.ok) {
//       return sendRes<PostProps>({
//         res,
//         code: CODE.OK,
//         msg: MSG.OK,
//         data: findResult.data,
//       })
//     }
//     return sendRes<null>({
//       res,
//       code: CODE.NOT_FOUND,
//       msg: `Post NOT FOUND`,
//       data: null,
//     })
//   } catch (error) {
//     throw new Error(`post:get by id: ${error}`)
//   }
// }
// // checking regis
// // interface
// // async function update(req: RequestCustoms<PostProps>, res: Response) {
// //   try {
// //       const updateResult = await PostRepositories.patch(req.body.)
// //       if (updateResult) {
// //         return sendRes<null>({
// //           res,
// //           code: CODE.OK,
// //           msg: MSG.UPDATED,
// //           data: null,
// //         })
// //       }
// //       return sendRes<null>({
// //         res,
// //         code: CODE.FAILED,
// //         msg: MSG.NOT_FOUND,
// //         data: null,
// //       })
// //   } catch (error) {
// //     throw new Error(`post:change status error: ${error}`)
// //   }
// // }
// // change status
// async function markDelete(req: Request, res: Response) {
//   const _id = req.params._id as string
//   try {
//     const regisData = await PostRepositories.get(_id)
//     if (regisData.ok) {
//       const updateResult = await PostRepositories.patch(_id, { deleted: true })
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
//       msg: `Post NOT FOUND`,
//       data: null,
//     })
//   } catch (error) {
//     throw new Error(`post: delete error: ${error}`)
//   }
// }
function getTestQuestions(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = req.query;
        if (!query.level || !query.quantity) {
            return (0, response_handler_1.sendRes)({
                res,
                code: common_1.CODE.FAILED,
                msg: common_1.MSG.MISSING_PARAMS,
                data: null,
            });
        }
        try {
            const result = yield question_repositories_1.QuestionRepositories.getTestQuestions({
                level: query.level.toString(),
                quantity: Number(query.quantity),
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
            throw new Error(`Question get for test:controller: ${error}`);
        }
    });
}
exports.QuestionController = {
    create,
    getTestQuestions,
    // update,
    // markDelete,
    // getOne,
    // search,
};
