import { PagingDataProps } from './../helper/response-handler'
import { database } from '../models/model.index'
import { ClassProps } from '../models/class.model'
import { RepositoriesResultProps } from './types'
import { CLASS_LEVEL, CLASS_STATUS } from '../const/common'
import { SearchFilterProps } from './common.repositories'

const Classes = database.classes
async function create(payload: ClassProps): Promise<RepositoriesResultProps<string | null>> {
  try {
    const result = await Classes.create(payload)
    if (result) {
      return {
        ok: true,
        data: result._id,
      }
    }
    return {
      ok: false,
      data: null,
    }
  } catch (error) {
    throw new Error(`repositories-class:Create error: ${error}`)
  }
}

async function get(_id: string): Promise<RepositoriesResultProps<ClassProps | null>> {
  try {
    const result = await Classes.findById(_id)
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
    throw new Error(`repositories-class:Get error: ${error}`)
  }
}

async function patch(
  _id: string,
  newValue: Partial<ClassProps>,
): Promise<RepositoriesResultProps<null>> {
  try {
    const result = await Classes.findOneAndUpdate({ _id }, newValue)
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
    throw new Error(`repositories-class:patch error: ${error}`)
  }
}
export interface SearchClassParamsProps {
  classLevel?: string
  status?: CLASS_STATUS
  recruiting?: Boolean
  deleted?: Boolean
}

async function search({
  filter,
  page,
  pageSize,
}: SearchFilterProps<SearchClassParamsProps>): Promise<
  RepositoriesResultProps<PagingDataProps<ClassProps> | null>
> {
  //console.log('repo:class', filter)
  const fields = {
    description: 0,
  }
  try {
    const currentPage = (page - 1) * pageSize

    const query = await Classes.find(filter, { ...fields })
      .sort({ createdAt: -1 })
      .skip(currentPage)
      .limit(pageSize)
    //console.log(query)
    const totalCount = await Classes.find(filter).countDocuments()
    let data = {} as PagingDataProps<ClassProps>
    if (query && totalCount) {
      data = {
        dataTable: query,
        paging: {
          page: page,
          pageSize: pageSize,
        },
        totalCount: totalCount,
      }
    }

    return {
      ok: true,
      data,
    }
  } catch (error) {
    throw new Error(`repositories-class:Get error: ${error}`)
  }
}

export const ClassRepositories = {
  create,
  patch,
  get,
  search,
}
