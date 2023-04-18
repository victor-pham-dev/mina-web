// import { REGEX } from '../const/regexp'
import { ResultProps } from './types'
import { ClassProps } from '../models/class.model'
import { StudentProps } from 'src/models/student.model'

function create(body: StudentProps): ResultProps {
  let valid = true
  let msg: string[] = []
  if (!body.classId) {
    valid = false
    msg.push('Class id')
  }
  if (!body.regisId) {
    valid = false
    msg.push('name')
  }

  return { valid, msg }
}

export const StudentValidator = {
  create,
}
