import { database } from '../models/model.index'
import { ClassProps } from '../models/class.model'
import { RepositoriesResultProps } from './types'
import { PostProps } from '../models/post.model'
import { POST_STATUS, POST_TYPE } from '../const/common'
import { SearchFilterProps, Searcher } from './common.repositories'
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
  console.log('repo:post', filter)
  try {
    const result = await Searcher<SearchPostParamsProps>(Posts, filter, page, pageSize)

    return {
      ok: true,
      data: result.data,
    }
  } catch (error) {
    throw new Error(`repositories-post:search error: ${error}`)
  }
}

export const PostRepositories = {
  create,
  patch,
  get,
  search,
}
