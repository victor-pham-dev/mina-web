import { Request, Response } from 'express'
import { RequestCustoms } from '../helper/requestHanlder'
import { CLASS_STATUS, CODE, MSG, REGIS_STATUS } from '../const/common'
import { sendRes } from '../helper/response-handler'
import { RegisClassProps } from '../models/regis-class.model'
import { regisClassValidator } from '../validator/regis-class.validator'
import { RegisClassRepositories } from '../repositories/regis-class.repositories'
import { ClassRepositories } from 'src/repositories/class.repositories'

// create regis class info
async function regis(req: RequestCustoms<RegisClassProps>, res: Response) {
  const bodyValid = regisClassValidator.regis(req.body)
  if (!bodyValid.valid) {
    return sendRes<null>({
      res,
      code: CODE.FAILED,
      msg: `Invalid ${bodyValid.msg.toString()}`,
      data: null,
    })
  }
  try {
    const classExisted = await ClassRepositories.get(req.body.classId)
    if (!classExisted || classExisted.data.status !== CLASS_STATUS.OPEN) {
      return sendRes<null>({
        res,
        code: CODE.FAILED,
        msg: 'Class is not open',
        data: null,
      })
    }

    const createResult = await RegisClassRepositories.create({
      ...req.body,
      deleted: false,
      status: REGIS_STATUS.INIT,
    })
    console.log(REGIS_STATUS.INIT)
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
    throw new Error(`regis new class error ${error}`)
  }
}

// checking regis
interface updateStatusProps {
  _id: string
  status: REGIS_STATUS.INIT | REGIS_STATUS.CHECKED | REGIS_STATUS.CONFIRMED | REGIS_STATUS.CANCELED
}
async function updateStatus(req: RequestCustoms<updateStatusProps>, res: Response) {
  try {
    const regisData = RegisClassRepositories.get(req.body._id)
    if (regisData) {
      const updateResult = await RegisClassRepositories.put(req.body._id, 'status', req.body.status)
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
    throw new Error(`change status regis class error: ${error}`)
  }
}

// change status
async function markDelete(req: Request, res: Response) {
  const _id = req.params._id as string
  try {
    const regisData = RegisClassRepositories.get(_id)
    if (regisData) {
      const updateResult = await RegisClassRepositories.put(_id, 'deleted', true)
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
    throw new Error(`change status regis class error: ${error}`)
  }
}

export const RegisClassController = {
  regis,
  updateStatus,
  markDelete,
}
