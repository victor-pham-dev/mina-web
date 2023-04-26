import { CLASS_LEVEL } from 'src/const/common'
import { database } from '../models/model.index'
import { RepositoriesResultProps } from './types'
import { QuestionProps } from 'src/models/question.model'

const Questions = database.questions
async function create(payload: QuestionProps): Promise<RepositoriesResultProps<string | null>> {
  try {
    const result = await Questions.create(payload)
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
    throw new Error(`repositories-question:Create error: ${error}`)
  }
}

// async function get(_id: string): Promise<RepositoriesResultProps<PostProps | null>> {
//   try {
//     const result = await Posts.findById(_id)
//     if (result) {
//       return {
//         ok: true,
//         data: result,
//       }
//     }
//     return {
//       ok: false,
//       data: null,
//     }
//   } catch (error) {
//     throw new Error(`repositories-post:Get error: ${error}`)
//   }
// }

// async function patch(
//   _id: string,
//   newValue: Partial<PostProps>,
// ): Promise<RepositoriesResultProps<null>> {
//   try {
//     const result = await Posts.findOneAndUpdate({ _id }, newValue)
//     if (result) {
//       return {
//         ok: true,
//         data: null,
//       }
//     }
//     return {
//       ok: false,
//       data: null,
//     }
//   } catch (error) {
//     throw new Error(`repositories-post:patch error: ${error}`)
//   }
// }

export interface GetTestQuestionsParamsProps {
  quantity?: number
  level: string
}

async function getTestQuestions({
  quantity,
  level,
}: GetTestQuestionsParamsProps): Promise<RepositoriesResultProps<QuestionProps[]>> {
  //console.log('repo:question', quantity, level)
  try {
    const result = await Questions.aggregate([
      { $match: { level: level, deleted: false } },
      { $sample: { size: quantity } },
      {
        $project: {
          _id: 1,
          question: 1,
          answers: 1,
        },
      },
    ])

    return {
      ok: true,
      data: result,
    }
  } catch (error) {
    throw new Error(`repositories-quesiton:get test error: ${error}`)
  }
}

export const QuestionRepositories = {
  create,
  getTestQuestions,
  // patch,
  // get,
  // search,
}
