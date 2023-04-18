import bcrypt from 'bcrypt'
import { Response } from 'express'
import jwt from 'jsonwebtoken'
import { RequestCustoms } from '../helper/requestHanlder'
import { UserProps } from '../models/user.model'
import { CODE, KEY, MSG, ROLE, USER_STATUS } from '../const/common'
import { sendRes } from '../helper/response-handler'
import { AuthRequestProps } from '../middleware/auth'
import { database } from '../models/model.index'
import { userValidator } from '../validator/user.validator'
import { redisControl } from '../middleware/redis'

const Users = database.users

// function: create accessToken
async function createAccessToken(email: string, role: number) {
  const token = jwt.sign({ email: email, role: role }, KEY.ACCESS_TOKEN, {
    expiresIn: '7d',
  })
  return token
}
//

//function encrypt password
async function encrypter(str: string) {
  const encryptedStr = await bcrypt.hash(str, 10)
  return encryptedStr
}
//

async function Register(req: RequestCustoms<UserProps>, res: Response) {
  try {
    const { name, password, email, gender, yOB } = req.body
    //validate body
    let bodyValid = userValidator.register(req.body)
    // console.log(bodyValid);
    if (!bodyValid.valid) {
      return sendRes({
        res: res,
        code: CODE.FAILED,
        msg: bodyValid.msg.toString(),
        data: null,
      })
    }
    //check exist
    const existPhone = await Users.findOne({ email })
    if (existPhone) {
      return sendRes({
        res: res,
        code: CODE.EXIST,
        msg: MSG.EXISTED,
        data: null,
      })
    }
    //hash password
    const encryptedPassword = await encrypter(password)
    //create new user
    const user = await Users.create({
      password: encryptedPassword,
      name: name,
      email: email,
      role: ROLE.USER,
      gender: gender,
      yOB: yOB,
      status: USER_STATUS.VERIFIED,
      deleted: false,
    })

    if (user) {
      return sendRes({
        res: res,
        code: CODE.CREATED,
        msg: 'OK',
        data: null,
      })
    } else {
      return sendRes({
        res: res,
        code: CODE.FAILED,
        msg: MSG.UNKNOW,
        data: null,
      })
    }
  } catch (err) {
    throw new Error(`some thing wrong went regis new user ${err}`)
  }
}

// login use account
export interface LoginAccountProps {
  email: string
  password: string
}
async function LoginWithAccount(req: RequestCustoms<LoginAccountProps>, res: Response) {
  const { email, password } = req.body
  let bodyValid = userValidator.loginWithAccount(req.body)
  if (!bodyValid.valid) {
    return sendRes({
      res: res,
      code: CODE.FAILED,
      msg: bodyValid.msg.toString(),
      data: null,
    })
  }

  try {
    const user: UserProps | null = await Users.findOne({ email })

    if (!user || user === null) {
      return sendRes({
        res: res,
        code: CODE.FAILED,
        msg: 'Invalid email or password',
        data: null,
      })
    } else {
      const passwordValid = await bcrypt.compare(password, user.password)
      if (passwordValid) {
        const accessToken = await createAccessToken(email, user.role)
        const replaceRedisResult = await redisControl.setRecord(email, accessToken)
        if (replaceRedisResult.ok) {
          return sendRes({
            res: res,
            code: CODE.OK,
            msg: 'OK',
            data: { accessToken },
          })
        } else {
          return sendRes({
            res: res,
            code: CODE.INTERNAL,
            msg: 'Server Error',
            data: null,
          })
        }
      } else {
        return sendRes({
          res: res,
          code: CODE.FAILED,
          msg: 'Invalid email or password',
          data: null,
        })
      }
    }
  } catch (err) {
    throw new Error(`some thing wrong when login ${err}`)
  }
}

//authen check token and get profile

async function Auth(req: AuthRequestProps, res: Response) {
  try {
    const user = await Users.findOne({ email: req.user.email }, { password: 0 })
    if (user) {
      return sendRes({
        res: res,
        code: CODE.OK,
        msg: 'OK',
        data: user,
      })
    } else {
      return sendRes({
        res: res,
        code: CODE.FAILED,
        msg: 'Invalid Token',
        data: null,
      })
    }
  } catch (error) {
    throw new Error(`get profile error ${error}`)
  }
}

export const UserController = {
  Register,
  LoginWithAccount,
  Auth,
}
