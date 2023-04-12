import { Request, Response } from 'express'
import { RequestCustoms } from '../helper/requestHanlder'
import { CLASS_STATUS, CODE, MSG, REGIS_STATUS } from '../const/common'
import { sendRes } from '../helper/response-handler'

import { RegisClassRepositories } from '../repositories/regis-class.repositories'
import { ClassProps } from '../models/class.model'
import { ClassValidator } from '../validator/class.validator'
import { ClassRepositories } from '../repositories/class.repositories'

// create regis class info
async function create(req: RequestCustoms<ClassProps>, res: Response) {
  const bodyValid = ClassValidator.create(req.body)
  if (!bodyValid.valid) {
    return sendRes<null>({
      res,
      code: CODE.FAILED,
      msg: `Invalid ${bodyValid.msg.toString()}`,
      data: null,
    })
  }
  try {
    const createResult = await ClassRepositories.create({
      ...req.body,
      deleted: false,
      status: CLASS_STATUS.OPEN,
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
    throw new Error(`class:create error ${error}`)
  }
}

// checking regis
interface updateStatusProps {
  _id: string
  status: REGIS_STATUS.INIT | REGIS_STATUS.CHECKED | REGIS_STATUS.CONFIRMED | REGIS_STATUS.CANCELED
}
async function updateStatus(req: RequestCustoms<updateStatusProps>, res: Response) {
  try {
    const regisData = ClassRepositories.get(req.body._id)
    if (regisData) {
      const updateResult = await ClassRepositories.put(req.body._id, 'status', req.body.status)
      if (updateResult) {
        return sendRes<null>({
          res,
          code: CODE.OK,
          msg: MSG.UPDATED,
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
      msg: `REGIS DATA NOT FOUND`,
      data: null,
    })
  } catch (error) {
    throw new Error(`class:change status error: ${error}`)
  }
}

// change status
async function markDelete(req: Request, res: Response) {
  const _id = req.params._id as string
  try {
    const regisData = RegisClassRepositories.get(_id)
    if (regisData) {
      const updateResult = await ClassRepositories.put(_id, 'deleted', true)
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
      msg: `REGIS DATA NOT FOUND`,
      data: null,
    })
  } catch (error) {
    throw new Error(`class: delete error: ${error}`)
  }
}

export const ClassController = {
  create,
  updateStatus,
  markDelete,
}
