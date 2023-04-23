import { Request, Response } from 'express'
import { RequestCustoms } from '../helper/requestHanlder'
import { CODE, MSG } from '../const/common'
import { PagingDataProps, sendRes } from '../helper/response-handler'
import { PostProps } from '../models/post.model'
import { PostRepositories, SearchPostParamsProps } from '../repositories/post.repositories'
import { QuestionProps } from '../models/question.model'
import { QuestionValidator } from '../validator/question.validator'
import {
  GetTestQuestionsParamsProps,
  QuestionRepositories,
} from '../repositories/question.repositories'

async function create(req: RequestCustoms<QuestionProps>, res: Response) {
  const bodyValid = QuestionValidator.create(req.body)
  if (!bodyValid.valid) {
    return sendRes<null>({
      res,
      code: CODE.FAILED,
      msg: `Invalid ${bodyValid.msg.toString()}`,
      data: null,
    })
  }
  try {
    const createResult = await QuestionRepositories.create({
      ...req.body,
      deleted: false,
    })
    if (createResult.ok) {
      return sendRes<string>({
        res,
        code: CODE.CREATED,
        msg: MSG.CREATED,
        data: createResult.data,
      })
    }
    return sendRes<null>({
      res,
      code: CODE.FAILED,
      msg: `Create failed`,
      data: null,
    })
  } catch (error) {
    throw new Error(`question:create error ${error}`)
  }
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

async function getTestQuestions(req: Request, res: Response) {
  const query = req.query
  if (!query.level || !query.quantity) {
    return sendRes<null>({
      res,
      code: CODE.FAILED,
      msg: MSG.MISSING_PARAMS,
      data: null,
    })
  }
  try {
    const result = await QuestionRepositories.getTestQuestions({
      level: query.level.toString(),
      quantity: Number(query.quantity),
    })
    if (result.ok) {
      return sendRes<QuestionProps[]>({
        res,
        code: CODE.OK,
        msg: MSG.OK,
        data: result.data,
      })
    }
    return sendRes<null>({
      res,
      code: CODE.NOT_FOUND,
      msg: `QUERRY ERROR`,
      data: null,
    })
  } catch (error) {
    throw new Error(`Question get for test:controller: ${error}`)
  }
}

export const QuestionController = {
  create,
  getTestQuestions,
  // update,
  // markDelete,
  // getOne,
  // search,
}
