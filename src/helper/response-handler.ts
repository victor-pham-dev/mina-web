import { Response } from 'express'
import { CODE } from '../const/common'

export interface PagingDataProps<T> {
  dataTable: T[]
  paging: {
    page: number
    pageSize: number
  }
  totalCount: number
}
interface ResponseProps<T> {
  res: Response
  code:
    | CODE.AUTH_FAILED
    | CODE.CREATED
    | CODE.EXIST
    | CODE.FAILED
    | CODE.INTERNAL
    | CODE.NOT_FOUND
    | CODE.OK
    | CODE.TOKEN_REQUIRED
  msg: string
  data: T
}

export const sendRes = function <T>({ res, code, msg, data }: ResponseProps<T>) {
  return res.status(code).send({ code: code, data: data, msg: msg })
}
