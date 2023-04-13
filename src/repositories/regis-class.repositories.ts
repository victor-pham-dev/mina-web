import { database } from '../models/model.index'
import { RegisClassProps } from '../models/regis-class.model'
import { RepositoriesResultProps } from './types'

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

async function put(
  _id: string,
  key: keyof RegisClassProps,
  value: string | number | boolean,
): Promise<RepositoriesResultProps<null>> {
  try {
    const newValue = {
      [key]: value,
    }
    const result = await RegisClasses.findOneAndUpdate({ _id }, newValue)
    console.log(result)
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

export const RegisClassRepositories = {
  create,
  put,
  get,
}
