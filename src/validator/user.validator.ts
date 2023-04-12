import { REGEX } from '../const/regexp'
import { LoginAccountProps } from '../controller/user.controller'
import { UserProps } from '../models/user.model'
import { ResultProps } from './types'

const userValidator = {
  register: function (body: UserProps): ResultProps {
    let valid = true
    let msg: string[] = []
    if (!body.name || body.name?.trim().length === 0) {
      valid = false
      msg.push('Name')
    }
    if (!body.email || body.email.trim().length === 0 || !REGEX.EMAIL.test(body.email)) {
      valid = false
      msg.push('Email')
    }
    if (!body.password || body.password.trim().length < 6) {
      valid = false
      msg.push('Password')
    }
    return { valid, msg }
  },
  //login with account
  loginWithAccount: function (body: LoginAccountProps): ResultProps {
    let valid = true
    let msg: string[] = []

    if (!body.email || body.email?.trim().length === 0 || !REGEX.EMAIL.test(body.email)) {
      valid = false
      msg.push('Email')
    }

    if (!body.password || body.password?.trim().length < 6) {
      valid = false
      msg.push('Password')
    }
    return { valid, msg }
  },
}

export { userValidator }
