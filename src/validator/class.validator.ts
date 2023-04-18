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
  if (!body.daysOfWeek) {
    valid = false
    msg.push('Day of week')
  }
  if (!body.startDate) {
    valid = false
    msg.push('startDate')
  }
  if (!body.numberOfLessons) {
    valid = false
    msg.push('numberOfLessons')
  }
  if (!body.time) {
    valid = false
    msg.push('Time')
  }
  if (!body.description) {
    valid = false
    msg.push('Desciption')
  }

  return { valid, msg }
}

export const ClassValidator = {
  create,
}
