import { database } from '../models/model.index'
import { ClassProps } from '../models/class.model'
import { RepositoriesResultProps } from './types'

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

async function put(
  _id: string,
  key: keyof ClassProps,
  value: string | number | Boolean,
): Promise<RepositoriesResultProps<null>> {
  try {
    const newValue = {
      [key]: value,
    }
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
    throw new Error(`repositories-class:Put error: ${error}`)
  }
}

export const ClassRepositories = {
  create,
  put,
  get,
}
