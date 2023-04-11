import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { CODE, ROLE } from '../const/common'
import { sendRes } from '../helper/response-handler'
import { redisControl } from './redis'

//types
export interface AuthenValueProps {
  email: string
  role: number
}
export interface AuthRequestProps extends Request {
  user: AuthenValueProps
}

function compareTokenRedis(reqToken: string, redisToken: string): boolean {
  if (reqToken === redisToken) return true
  return false
}
//
export const commonAuth = async (req: AuthRequestProps, res: Response, next: NextFunction) => {
  const accessToken: string = req.headers['x-access-token'] as string
  if (!accessToken)
    return sendRes({
      res: res,
      code: CODE.TOKEN_REQUIRED,
      msg: 'MISSING: ACCESS_TOKEN',
      data: null,
    })
  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY) as AuthenValueProps
    req.user = decoded

    const redisExisted = await redisControl.getRecord(decoded.email)
    if (!redisExisted.ok || !compareTokenRedis(accessToken, redisExisted.value))
      return sendRes({
        res: res,
        code: CODE.TOKEN_REQUIRED,
        msg: 'TOKEN CHANGED',
        data: null,
      })

    next()
  } catch (error) {
    throw new Error(`error common authentication ${error}`)
  }
}

export const adminAuth = async (req: AuthRequestProps, res: Response, next: NextFunction) => {
  const accessToken: string = req.headers['x-access-token'] as string
  if (!accessToken)
    return sendRes({
      res: res,
      code: CODE.TOKEN_REQUIRED,
      msg: 'MISSING: ACCESS_TOKEN',
      data: null,
    })
  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY) as AuthenValueProps
    req.user = decoded
    if (decoded.role > ROLE.STAFF) {
      return sendRes({
        res: res,
        code: CODE.TOKEN_REQUIRED,
        msg: 'NO PERMISSION',
        data: null,
      })
    }
    const redisExisted = await redisControl.getRecord(decoded.email)
    if (!redisExisted)
      return sendRes({
        res: res,
        code: CODE.TOKEN_REQUIRED,
        msg: 'TOKEN INVALID',
        data: null,
      })
    next()
  } catch (error) {
    throw new Error(`error admin authentication ${error}`)
  }
}
