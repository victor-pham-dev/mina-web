import { database } from '../models/model.index'
import { ClassProps } from '../models/class.model'
import { RepositoriesResultProps } from './types'
import { PostProps } from '../models/post.model'
import { POST_STATUS, POST_TYPE } from '../const/common'
import { SearchFilterProps } from './common.repositories'
import { PagingDataProps } from 'src/helper/response-handler'

const Posts = database.posts
async function create(payload: PostProps): Promise<RepositoriesResultProps<string | null>> {
  try {
    const result = await Posts.create(payload)
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
    throw new Error(`repositories-post:Create error: ${error}`)
  }
}

async function get(_id: string): Promise<RepositoriesResultProps<PostProps | null>> {
  try {
    const result = await Posts.findById(_id)
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
    throw new Error(`repositories-post:Get error: ${error}`)
  }
}

async function patch(
  _id: string,
  newValue: Partial<PostProps>,
): Promise<RepositoriesResultProps<null>> {
  try {
    const result = await Posts.findOneAndUpdate({ _id }, newValue)
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
    throw new Error(`repositories-post:patch error: ${error}`)
  }
}

export interface SearchPostParamsProps {
  type?: string
  status?: POST_STATUS
  deleted?: Boolean
  title?: { $regex: RegExp }
}

async function search({
  filter,
  page,
  pageSize,
}: SearchFilterProps<SearchPostParamsProps>): Promise<
  RepositoriesResultProps<PagingDataProps<PostProps> | null>
> {
  //console.log('repo:post', filter)
  const fields = {
    content: 0,
  }
  try {
    const currentPage = (page - 1) * pageSize

    const query = await Posts.find(filter, { ...fields })
      .sort({ createdAt: -1 })
      .skip(currentPage)
      .limit(pageSize)
    const totalCount = await Posts.find(filter).countDocuments()
    let data = {} as PagingDataProps<PostProps>
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
    throw new Error(`repositories-post:search error: ${error}`)
  }
}

async function getRelated(
  currentId: string,
  type: string,
): Promise<RepositoriesResultProps<PostProps[]>> {
  try {
    const result = await Posts.find(
      {
        _id: { $ne: currentId },
        type,
      },
      { content: 0 },
    ).limit(4)
    return {
      ok: true,
      data: result ?? [],
    }
  } catch (error) {
    throw new Error(`repositories-post: related error`)
  }
}

export const PostRepositories = {
  create,
  patch,
  get,
  search,
  getRelated,
}
