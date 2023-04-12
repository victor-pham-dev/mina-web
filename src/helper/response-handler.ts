import { Response } from "express"
import { CODE } from "src/const/common"

export interface PagingDataProps {
  dataTable: any
  paging: {
    page: number
    total: number
    pageSize: number
  }
  totalCount: number
}
interface ResponseProps {
  res: Response
  code: CODE.AUTH_FAILED | CODE.CREATED | CODE.EXIST | CODE.FAILED | CODE.INTERNAL | CODE.NOT_FOUND | CODE.OK | CODE.TOKEN_REQUIRED
  msg: string
  data: any
}

export const sendRes = function ({res, code, msg, data}: ResponseProps) {
  return res.status(code).send({ code: code, data: data, msg: msg })
}
