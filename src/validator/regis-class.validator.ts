import { RegisClassProps } from '../models/regis-class.model'
import { REGEX } from '../const/regexp'
import { ResultProps } from './types'

function regis(body: RegisClassProps): ResultProps {
  let valid = true
  let msg: string[] = []
  if (!body.name || (body.name && body.name?.trim().length === 0)) {
    valid = false
    msg.push('Name')
  }
  if (!body.phone || (body.phone && !REGEX.PHONE.test(body.phone))) {
    valid = false
    msg.push('Phone')
  }
  if (!body.address || (body.address && body.address?.trim().length === 0)) {
    valid = false
    msg.push('Address')
  }
  if (!body.phone || (body.email && !REGEX.EMAIL.test(body.email))) {
    valid = false
    msg.push('Email')
  }
  if (!body.facebookLink || (body.facebookLink && body.facebookLink?.trim().length === 0)) {
    valid = false
    msg.push('Facebook Link')
  }
  // if (body.method === undefined || body.method === null) {
  //   valid = false
  //   msg.push('Method')
  // }
  // if (!body.classLevel || (body.classLevel && body.classLevel.trim().length === 0)) {
  //   valid = false
  //   msg.push('Class level')
  // }
  if (!body.knowFrom || (body.knowFrom && body.knowFrom?.trim().length === 0)) {
    valid = false
    msg.push('Know From')
  }
  if (body.everStudied === undefined || body.everStudied === null) {
    valid = false
    msg.push('Ever Studied')
  }
  if (!body.leanTo || (body.leanTo && body.leanTo?.trim().length === 0)) {
    valid = false
    msg.push('Learn to')
  }

  return { valid, msg }
}

export const regisClassValidator = {
  regis,
}
