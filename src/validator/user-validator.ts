import { ROLE } from 'src/const/common'
import { REGEX } from 'src/const/regexp'

const userValidator = {
  register: function (body: any) {
    let valid = true
    let msg = []
    if (!body.name || body.name?.trim().length === 0) {
      valid = false
      msg.push('Tên không hợp lệ')
    }
    if (!body.phone || body.phone?.trim().length === 0) {
      valid = false
      msg.push('Số điện thoại không hợp lệ')
    }
    if (!body.role || body.role?.trim().length === 0) {
      valid = false
      msg.push('Quyền không hợp lệ')
    }
    if (!body.password || body.password.trim().length < 6 || !REGEX.PASSWORD.test(body.password)) {
      valid = false
      msg.push('Mật khẩu')
    }
    if (body.phone && !REGEX.PHONE.test(body.phone)) {
      valid = false
      msg.push('Số điện thoại')
    }
    if (body.role === ROLE.ADMIN && body.phone !== '0343241299') {
      valid = false
      msg.push('Sai đối tượng')
    }
    return { valid, msg }
  },

  login: function (body: any) {
    let valid = true
    let msg = []

    if (!body.phone || body.phone?.trim().length === 0 || !REGEX.PHONE.test(body.phone)) {
      valid = false
      msg.push('Số điện thoại')
    }

    if (!body.password || body.password?.trim().length < 6 || !REGEX.PASSWORD.test(body.password)) {
      valid = false
      msg.push('Mật khẩu')
    }
    return { valid, msg }
  },
}

export {  userValidator }
