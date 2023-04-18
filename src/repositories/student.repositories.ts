import { PagingDataProps } from './../helper/response-handler'
import { database } from '../models/model.index'
import { ClassProps } from '../models/class.model'
import { RepositoriesResultProps } from './types'
import { CLASS_LEVEL, CLASS_STATUS } from '../const/common'
import { SearchFilterProps, Searcher } from './common.repositories'
import { StudentProps } from '../models/student.model'
import { ClassRepositories } from './class.repositories'

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
    const result = await Students.create(payload)
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
// export interface SearchClassParamsProps {
//   classLevel?: string
//   status?: CLASS_STATUS
//   recruiting?: Boolean
//   deleted?: Boolean
// }

// async function search({
//   filter,
//   page,
//   pageSize,
// }: SearchFilterProps<SearchClassParamsProps>): Promise<
//   RepositoriesResultProps<PagingDataProps<ClassProps> | null>
// > {
//   console.log('repo:student', filter)
//   try {
//     const result = await Searcher<SearchClassParamsProps>(Students, filter, page, pageSize)
//     if (result.ok) {
//       return {
//         ok: true,
//         data: result.data,
//       }
//     }
//     return {
//       ok: false,
//       data: null,
//     }
//   } catch (error) {
//     throw new Error(`repositories-class:Get error: ${error}`)
//   }
// }

export const StudentRepositories = {
  create,
  patch,
  get,
  //   search,
}
