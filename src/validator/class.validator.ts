// import { REGEX } from '../const/regexp'
import { ResultProps } from './types'
import { ClassProps } from '../models/class.model'

function create(body: ClassProps): ResultProps {
  let valid = true
  let msg: string[] = []
  if (!body.classLevel || (body.classLevel && body.classLevel?.trim().length === 0)) {
    valid = false
    msg.push('Class level')
  }
  if (!body.creatorId || (body.creatorId && body.creatorId?.trim().length === 0)) {
    valid = false
    msg.push('Creator Id')
  }
  if (!body.numberOfStudents || (body.numberOfStudents && body.numberOfStudents < 1)) {
    valid = false
    msg.push('Number of student')
  }
  if (!body.startDate) {
    valid = false
    msg.push('Start date')
  }

  return { valid, msg }
}

export const ClassValidator = {
  create,
}
