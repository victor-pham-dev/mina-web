import { Request, Response } from 'express'
import { RequestCustoms } from '../helper/requestHanlder'
import { CODE, MSG } from '../const/common'
import { PagingDataProps, sendRes } from '../helper/response-handler'
import { LogProps } from '../models/common-types'
import { StudentProps } from '../models/student.model'
import { StudentValidator } from '../validator/student.validator'
import { SearchStudentFilterProps, StudentRepositories } from '../repositories/student.repositories'

// create regis class info
async function create(req: RequestCustoms<StudentProps>, res: Response) {
  const bodyValid = StudentValidator.create(req.body)
  if (!bodyValid.valid) {
    return sendRes<null>({
      res,
      code: CODE.FAILED,
      msg: `Invalid ${bodyValid.msg.toString()}`,
      data: null,
    })
  }
  try {
    // const createLog: LogProps = {
    //   time: new Date().toLocaleString(),
    //   content: 'created',
    // }
    const createResult = await StudentRepositories.create({
      ...req.body,
      deleted: false,
      // status: STUDENT_STATUS.WAITING,
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
    throw new Error(`student:create error ${error}`)
  }
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

async function search(req: Request, res: Response) {
  const query = req.query
  try {
    let filter: SearchStudentFilterProps = {
      deleted: false,
    }
    if (query.classId !== undefined && query.classId !== null) {
      filter.classId = query.classId.toString()
    }
    const result = await StudentRepositories.search({
      filter: filter,
      page: Number(query.page) ?? 1,
      pageSize: Number(query.pageSize) ?? 10,
    })
    if (result.ok) {
      return sendRes<PagingDataProps<any>>({
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
    throw new Error(`Student:controller: ${error}`)
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

export const StudentController = {
  create,
  search,
}
