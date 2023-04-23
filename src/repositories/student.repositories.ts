import { PagingDataProps } from './../helper/response-handler'
import { database } from '../models/model.index'
import { ClassProps } from '../models/class.model'
import { RepositoriesResultProps } from './types'
import { CLASS_LEVEL, CLASS_STATUS } from '../const/common'
import { SearchFilterProps, Searcher } from './common.repositories'
import { StudentProps } from '../models/student.model'
import { ClassRepositories } from './class.repositories'
import { RegisClassProps } from 'src/models/regis-class.model'

const Students = database.students
async function create(payload: StudentProps): Promise<RepositoriesResultProps<string | null>> {
  const foundClass = await ClassRepositories.get(payload.classId)
  if (
    !foundClass.ok ||
    foundClass.data.status === CLASS_STATUS.END ||
    !foundClass.data.recruiting
  ) {
    return {
      ok: false,
      data: null,
      msg: 'Class not found or closed',
    }
  }
  try {
    console.log(payload)
    const result = await Students.create(payload)
    console.log(result)
    if (result) {
      return {
        ok: true,
        data: result._id,
        msg: 'ok',
      }
    }
    return {
      ok: false,
      data: null,
      msg: 'create failed',
    }
  } catch (error) {
    throw new Error(`repositories-student:Create error: ${error}`)
  }
}

async function get(_id: string): Promise<RepositoriesResultProps<StudentProps | null>> {
  try {
    const result = await Students.findById(_id)
    if (result) {
      return {
        ok: true,
        data: result,
      }
    }
    return {
      ok: false,
      data: null,
    }
  } catch (error) {
    throw new Error(`repositories-student:Get error: ${error}`)
  }
}

async function patch(
  _id: string,
  newValue: Partial<StudentProps>,
): Promise<RepositoriesResultProps<null>> {
  try {
    const result = await Students.findOneAndUpdate({ _id }, newValue)
    if (result) {
      return {
        ok: true,
        data: null,
      }
    }
    return {
      ok: false,
      data: null,
    }
  } catch (error) {
    throw new Error(`repositories-student:patch error: ${error}`)
  }
}

export interface SearchStudentFilterProps {
  deleted: Boolean
  classId?: string
}
export interface SearchStudentProps {
  filter: SearchStudentFilterProps
  page: number
  pageSize: number
}

export interface SearchResultProps extends StudentProps {
  classInfo: ClassProps
  regisInfo: RegisClassProps
}
async function search({
  filter,
  page,
  pageSize,
}: SearchStudentProps): Promise<RepositoriesResultProps<PagingDataProps<SearchResultProps>>> {
  console.log('repo:student', filter)
  try {
    const currentPage = (page - 1) * pageSize
    const result = await Students.aggregate([
      {
        $match: filter,
      },
      {
        $lookup: {
          from: 'classes',
          let: { searchId: { $toObjectId: '$classId' } },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$searchId'] } } },
            {
              $project: {
                _id: 1,
                classLevel: 1,
                teacher: 1,
                numberOfLessons: 1,
                daysOfWeek: 1,
                startDate: 1,
                time: 1,
              },
            },
          ],

          as: 'classInfo',
        },
      },
      {
        $lookup: {
          from: 'regisclasses',
          let: { searchId: { $toObjectId: '$regisId' } },
          pipeline: [{ $match: { $expr: { $eq: ['$_id', '$$searchId'] } } }],
          as: 'regisInfo',
        },
      },
    ])
      .sort({ createdAt: -1 })
      .skip(currentPage)
      .limit(pageSize)
      .exec()

    const totalCount = await Students.find(filter).countDocuments()

    if (result) {
      console.log(result)
      return {
        ok: true,
        data: {
          dataTable: result,
          paging: { page: page, pageSize: pageSize },
          totalCount: totalCount,
        },
      }
    } else {
      console.log('khong co')
    }
  } catch (error) {
    throw new Error(`repositories-student:Search error: ${error}`)
  }
}

export const StudentRepositories = {
  create,
  patch,
  get,
  search,
}
