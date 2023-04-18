import { Request, Response } from 'express'
import { RequestCustoms } from '../helper/requestHanlder'
import { CLASS_STATUS, CODE, MSG, REGIS_STATUS } from '../const/common'
import { PagingDataProps, sendRes } from '../helper/response-handler'
import { ClassProps } from '../models/class.model'
import { ClassValidator } from '../validator/class.validator'
import { ClassRepositories, SearchClassParamsProps } from '../repositories/class.repositories'
import { LogProps } from '../models/common-types'

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
    const createLog: LogProps = {
      time: new Date().toLocaleString(),
      content: 'created',
    }
    const createResult = await ClassRepositories.create({
      ...req.body,
      deleted: false,
      recruiting: true,
      numberOfStudents: 0,
      logs: [createLog],
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
  status: CLASS_STATUS.OPEN | CLASS_STATUS.PROCESSING | CLASS_STATUS.END
}
async function updateStatus(req: RequestCustoms<updateStatusProps>, res: Response) {
  try {
    const regisData = await ClassRepositories.get(req.body._id)
    if (regisData.ok) {
      const updateResult = await ClassRepositories.patch(req.body._id, { status: req.body.status })
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
    const classData = await ClassRepositories.get(_id)
    if (classData.ok) {
      const updateResult = await ClassRepositories.patch(_id, { deleted: true })
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

// SearchClassParamsProps

async function search(req: Request, res: Response) {
  const query = req.query
  try {
    let filter: SearchClassParamsProps = {
      deleted: false,
    }
    if (query.status !== undefined && query.status !== null) {
      filter.status = Number(query.status)
    }
    if (query.recruiting !== undefined && query.recruiting !== null) {
      filter.recruiting = Boolean(query.recruiting)
    }
    if (query.classLevel !== undefined && query.classLevel !== null) {
      filter.classLevel = query.classLevel.toString()
    }
    const result = await ClassRepositories.search({
      filter: filter,
      page: Number(query.page) ?? 1,
      pageSize: Number(query.pageSize) ?? 9,
    })
    if (result.ok) {
      return sendRes<PagingDataProps<ClassProps>>({
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
    throw new Error(`Class:controller: ${error}`)
  }
}

async function getById(req: Request, res: Response) {
  const _id = req.params._id as string
  try {
    const result = await ClassRepositories.get(_id)
    if (result.ok) {
      return sendRes<ClassProps>({
        res,
        code: CODE.OK,
        msg: MSG.OK,
        data: result.data,
      })
    }
    return sendRes<null>({
      res,
      code: CODE.NOT_FOUND,
      msg: `CLASS NOT FOUND`,
      data: null,
    })
  } catch (error) {
    throw new Error(`class: get by id error: ${error}`)
  }
}

export const ClassController = {
  create,
  updateStatus,
  markDelete,
  search,
  getById,
}
