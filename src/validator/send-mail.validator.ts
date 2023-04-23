import { REGEX } from '../const/regexp'
import { SendMailProps } from '../controller/common.controller'
import { ResultProps } from './types'

const sendMailValidator = {
  send: function (body: SendMailProps): ResultProps {
    let valid = true
    let msg: string[] = []
    if (!body.subject || body.subject?.trim().length === 0) {
      valid = false
      msg.push('subject')
    }
    if (!body.to || body.to.trim().length === 0 || !REGEX.EMAIL.test(body.to)) {
      valid = false
      msg.push('Email Receive')
    }
    if (!body.text) {
      valid = false
      msg.push('Body')
    }
    return { valid, msg }
  },
}

export { sendMailValidator }
