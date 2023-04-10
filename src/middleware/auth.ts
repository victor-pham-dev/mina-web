import jwt from 'jsonwebtoken'
import { CODE, ROLE } from '../const/common'
const { sendRes } = require('../helper/response-handler')
import { Request, Response, NextFunction } from 'express'
//types
interface AuthenValueProps {
  email: string
    role: string
}
interface ReqProps extends Request {
  user : AuthenValueProps
}
//
export const commonAuth = (req: ReqProps, res: Response, next: NextFunction) => {
  const accessToken: string = req.headers['x-access-token'] as string
  if (!accessToken) return sendRes(res, CODE.TOKEN_REQUIRED, 'MISSING: ACCESS_TOKEN')
  try {

  } catch (error) {
    return sendRes(res, CODE.TOKEN_REQUIRED, 'INTERNAL SERVER')
  }
}

export const adminAuth = (req: ReqProps, res: Response, next: NextFunction) => {
  const accessToken: string = req.headers['x-access-token'] as string
  if (!accessToken) return sendRes(res, CODE.TOKEN_REQUIRED, 'MISSING: ACCESS_TOKEN')
  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY) as AuthenValueProps
    req.user = decoded
    next()
  } catch (error) {
    return sendRes(res, CODE.TOKEN_REQUIRED, 'INTERNAL SERVER')
  }
}
