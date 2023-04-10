export const sendRes = function (res: any, code: number, data: any, msg: string) {
  res.status(code).send({ code: code, data: data, msg: msg })
}
