import { ResultProps } from './types'
import { QuestionProps } from 'src/models/question.model'

function create(body: QuestionProps): ResultProps {
  let valid = true
  let msg: string[] = []
  if (!body.question) {
    valid = false
    msg.push('question')
  }
  if (!body.answers || (body.answers && body.answers?.length < 4)) {
    valid = false
    msg.push('answers')
  }
  return { valid, msg }
}

export const QuestionValidator = {
  create,
}
