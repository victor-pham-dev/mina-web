import { Request, Response } from 'express'
import { RequestCustoms } from '../helper/requestHanlder'
import { CLASS_STATUS, CODE, MSG, REGIS_STATUS } from '../const/common'
import { PagingDataProps, sendRes } from '../helper/response-handler'
import { RegisClassProps } from '../models/regis-class.model'
import { regisClassValidator } from '../validator/regis-class.validator'
import {
  RegisClassRepositories,
  SearchRegisClassParamsProps,
} from '../repositories/regis-class.repositories'
import { ClassRepositories } from '../repositories/class.repositories'

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
  if (!req.body._id || !req.body.status) {
    return sendRes<null>({
      res,
      code: CODE.FAILED,
      msg: MSG.MISSING_PARAMS,
      data: null,
    })
  }
  try {
    const regisData = await RegisClassRepositories.get(req.body._id)
    if (regisData.ok) {
      const updateResult = await RegisClassRepositories.patch(req.body._id, {
        status: req.body.status,
      })
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
    const updateResult = await RegisClassRepositories.patch(_id, { deleted: true })
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
  } catch (error) {
    throw new Error(`change status regis class error: ${error}`)
  }
}

async function search(req: Request, res: Response) {
  const query = req.query
  try {
    let filter: SearchRegisClassParamsProps = {
      deleted: false,
    }

    if (query.status !== undefined && query.status !== null) {
      filter.status = Number(query.status)
    }
    const result = await RegisClassRepositories.search({
      filter: filter,
      page: Number(query.page) ?? 1,
      pageSize: Number(query.pageSize) ?? 10,
    })
    if (result.ok) {
      return sendRes<PagingDataProps<RegisClassProps>>({
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
    throw new Error(`regis-Class:controller: ${error}`)
  }
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

export const RegisClassController = {
  regis,
  updateStatus,
  markDelete,
  search,
}
