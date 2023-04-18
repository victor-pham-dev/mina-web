import { Request, Response } from 'express'
import { RequestCustoms } from '../helper/requestHanlder'
import { CODE, MSG } from '../const/common'
import { sendRes } from '../helper/response-handler'
import { PostProps } from '../models/post.model'
import { PostValidator } from '../validator/post.validator'
import { PostRepositories } from '../repositories/post.repositories'

// create regis class info
async function create(req: RequestCustoms<PostProps>, res: Response) {
  const bodyValid = PostValidator.create(req.body)
  if (!bodyValid.valid) {
    return sendRes<null>({
      res,
      code: CODE.FAILED,
      msg: `Invalid ${bodyValid.msg.toString()}`,
      data: null,
    })
  }
  try {
    const createResult = await PostRepositories.create({
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
    throw new Error(`post:create error ${error}`)
  }
}

//get a post
async function getOne(req: Request, res: Response) {
  const _id = req.params._id as string
  if (!_id) {
    return sendRes<null>({
      res,
      code: CODE.FAILED,
      msg: MSG.NOT_FOUND,
      data: null,
    })
  }
  try {
    const findResult = await PostRepositories.get(_id)
    if (findResult.ok) {
      return sendRes<PostProps>({
        res,
        code: CODE.OK,
        msg: MSG.OK,
        data: findResult.data,
      })
    }
    return sendRes<null>({
      res,
      code: CODE.NOT_FOUND,
      msg: `Post NOT FOUND`,
      data: null,
    })
  } catch (error) {
    throw new Error(`post:change status error: ${error}`)
  }
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
async function markDelete(req: Request, res: Response) {
  const _id = req.params._id as string
  try {
    const regisData = await PostRepositories.get(_id)
    if (regisData.ok) {
      const updateResult = await PostRepositories.patch(_id, { deleted: true })
      if (updateResult) {
        return sendRes<null>({
          res,
          code: CODE.OK,
          msg: MSG.DELETED,
          data: null,
        })
      }

      return sendRes<null>({
        res,
        code: CODE.FAILED,
        msg: MSG.NOT_FOUND,
        data: null,
      })
    }
    return sendRes<null>({
      res,
      code: CODE.NOT_FOUND,
      msg: `Post NOT FOUND`,
      data: null,
    })
  } catch (error) {
    throw new Error(`post: delete error: ${error}`)
  }
}

export const PostController = {
  create,
  // update,
  markDelete,
  getOne,
}
