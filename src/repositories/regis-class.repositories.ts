import { REGIS_STATUS } from '../const/common'
import { database } from '../models/model.index'
import { RegisClassProps } from '../models/regis-class.model'
import { RepositoriesResultProps } from './types'
import { SearchFilterProps } from './common.repositories'
import { PagingDataProps } from '../helper/response-handler'

const RegisClasses = database.regisclasses
async function create(payload: RegisClassProps): Promise<RepositoriesResultProps<string | null>> {
  try {
    const result = await RegisClasses.create(payload)
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
    throw new Error(`repositories:Create error: ${error}`)
  }
}

async function get(_id: string): Promise<RepositoriesResultProps<RegisClassProps | null>> {
  try {
    const result = await RegisClasses.findById(_id)
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
    throw new Error(`repositories:Create error: ${error}`)
  }
}

async function patch(
  _id: string,
  newValue: Partial<RegisClassProps>,
): Promise<RepositoriesResultProps<null>> {
  try {
    const result = await RegisClasses.findOneAndUpdate({ _id }, newValue)
    //console.log(result)
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
    throw new Error(`repositories:Create error: ${error}`)
  }
}
export interface SearchRegisClassParamsProps {
  status?: REGIS_STATUS
  deleted?: Boolean
}

async function search({
  filter,
  page,
  pageSize,
}: SearchFilterProps<SearchRegisClassParamsProps>): Promise<
  RepositoriesResultProps<PagingDataProps<RegisClassProps> | null>
> {
  //console.log('repo:regis-class', filter)
  try {
    const currentPage = (page - 1) * pageSize

    const query = await RegisClasses.find(filter)
      .sort({ createdAt: -1 })
      .skip(currentPage)
      .limit(pageSize)
    const totalCount = await RegisClasses.find(filter).countDocuments()
    let data = {} as PagingDataProps<RegisClassProps>
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

export const RegisClassRepositories = {
  create,
  patch,
  get,
  search,
}
