import { Request, Response } from 'express'
import { CODE } from '../const/common'
import { RequestCustoms } from '../helper/requestHanlder'
import { sendRes } from '../helper/response-handler'
// import { sendEmailService } from '../services/mailer'
import { sendMailValidator } from '../validator/send-mail.validator'
import uploader from '../services/upload-file'
import path from 'path'
import { removeSpecialChars } from '../helper/data-convert'
import { sendEmailService } from '../services/mailer'
export interface SendMailProps {
  from: string
  to: string
  subject: string
  text: string
}

// export const SendMail = async (req: RequestCustoms<SendMailProps>, res: Response) => {
//   const bodyValid = sendMailValidator.send(req.body)
//   if (!bodyValid.valid) {
//     return sendRes({
//       res: res,
//       code: CODE.FAILED,
//       msg: bodyValid.msg.toString(),
//       data: null,
//     })
//   }
//   try {
//     const result: any = await sendEmailService(req.body.to, req.body.subject, req.body.body)
//     if (result.ok) {
//       return sendRes({
//         res: res,
//         code: CODE.OK,
//         msg: 'OK',
//         data: null,
//       })
//     } else {
//       return sendRes({
//         res: res,
//         code: CODE.FAILED,
//         msg: 'SEND FAILED',
//         data: null,
//       })
//     }
//   } catch (error) {
//     throw new Error(`send mail failed ${error}`)
//   }
// }

async function Mailer(req: RequestCustoms<SendMailProps>, res: Response) {
  //const result = await sendEmailService({ to: 'sieunhankiet@gmail.com', subject: 'Test thoi', body: 'No body' })
  //const result = await transporter({...req.body, from: 'truongpham2412.dev@gmail.com'})

  try {
    await sendEmailService({
      to: 'sieunhankiet@gmail.com',
      subject: 'Hi Dat',
      body: 'Toi chi muon test mail thoi',
    })
    return sendRes<null>({
      res: res,
      code: CODE.OK,
      msg: 'SENT',
      data: null,
    })
  } catch (error) {
    return sendRes<null>({
      res: res,
      code: CODE.FAILED,
      msg: 'FAILED',
      data: error,
    })
  }
}

async function SingleUpload(req: Request, res: Response) {
  uploader.single('file')(req, res, function (err: any) {
    if (err) {
      return sendRes({
        res: res,
        code: CODE.FAILED,
        msg: 'UPLOAD FAILED',
        data: err,
      })
    }
    const fileName = req.file.filename
    const imageUrl = `https://minamvp.click/api/file/${fileName}`
    return sendRes({
      res: res,
      code: CODE.CREATED,
      msg: 'UPLOADED',
      data: imageUrl,
    })
  })
}

function getImageByName(req: Request, res: Response) {
  const imageName = req.params.imageName as string
  const imagePath = path.join(__dirname, '..', 'uploads', imageName)
  //console.log(imagePath)
  res.sendFile(imagePath)
}

export const CommonController = {
  SingleUpload,
  getImageByName,
  Mailer,
}
