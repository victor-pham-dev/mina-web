import { database } from '../models/model.index'
import { ClassProps } from '../models/class.model'
import { RepositoriesResultProps } from './types'
import { PostProps } from '../models/post.model'

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

async function put(
  _id: string,
  key: keyof ClassProps,
  value: string | number | Boolean,
): Promise<RepositoriesResultProps<null>> {
  try {
    const newValue = {
      [key]: value,
    }
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
    throw new Error(`repositories-post:Put error: ${error}`)
  }
}

async function patch(payload: PostProps): Promise<RepositoriesResultProps<null>> {
  try {
    const result = await Posts.findOneAndUpdate(
      { _id: payload._id },
      { title: payload.title, content: payload.content, type: payload.type },
    )
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
    throw new Error(`repositories-post:Put error: ${error}`)
  }
}

export const PostRepositories = {
  create,
  patch,
  get,
  put,
}
