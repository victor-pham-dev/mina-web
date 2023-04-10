import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { CODE, ROLE } from '../const/common'
const { sendRes } = require('../helper/response-handler')
//types
export interface AuthenValueProps {
  email: string
  role: number
}
export interface AuthRequestProps extends Request {
  user : AuthenValueProps
}
//
export const commonAuth = (req: AuthRequestProps, res: Response, next: NextFunction) => {
  const accessToken: string = req.headers['x-access-token'] as string
  if (!accessToken) return sendRes(res, CODE.TOKEN_REQUIRED, 'MISSING: ACCESS_TOKEN')
  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY) as AuthenValueProps
    req.user = decoded
    console.log("common auth: ",decoded);
    next()
  } catch (error) {
    return sendRes(res, CODE.TOKEN_REQUIRED, 'INTERNAL SERVER')
  }
}

export const adminAuth = (req: AuthRequestProps, res: Response, next: NextFunction) => {
  const accessToken: string = req.headers['x-access-token'] as string
  if (!accessToken) return sendRes(res, CODE.TOKEN_REQUIRED, 'MISSING: ACCESS_TOKEN')
  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY) as AuthenValueProps
    req.user = decoded
    if(decoded.role > ROLE.STAFF){
      return sendRes(res, CODE.TOKEN_REQUIRED, 'NO PERMISSION')
    }
    next()
  } catch (error) {
    return sendRes(res, CODE.TOKEN_REQUIRED, 'INTERNAL SERVER')
  }
}
