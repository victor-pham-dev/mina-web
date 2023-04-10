import { Response } from "express";
import { CODE } from "../const/common";
import { RequestCustoms } from "../helper/requestHanlder";
import { sendRes } from "../helper/response-handler";
import { sendEmailService } from "../services/mailer";
import { sendMailValidator } from "../validator/send-mail-validator";

export interface SendMailProps {
   to: string
   subject: string
   body: string
}

export const SendMail = async (req: RequestCustoms<SendMailProps>, res: Response)=>{
   const bodyValid = sendMailValidator.send(req.body)
   if(!bodyValid.valid){
      return sendRes({
         res: res,
         code: CODE.FAILED,
         msg: bodyValid.msg.toString(),
         data: null
       })
   }
   try {
      const result: any = await sendEmailService(
         req.body.to,
         req.body.subject,
         req.body.body,
      )
      if(result){

         return sendRes({
            res: res,
            code: CODE.OK,
            msg: "OK",
            data: null
          })

      }else{

         return sendRes({
            res: res,
            code: CODE.FAILED,
            msg: "SEND FAILED",
            data: null
          })

      }
   } catch (error) {
      throw new Error(`send mail failed ${error}`)
   }
}