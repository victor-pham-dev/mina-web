"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonController = void 0;
const common_1 = require("../const/common");
const response_handler_1 = require("../helper/response-handler");
const upload_file_1 = __importDefault(require("../services/upload-file"));
const path_1 = __importDefault(require("path"));
const mailer_1 = require("../services/mailer");
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
function Mailer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //const result = await sendEmailService({ to: 'sieunhankiet@gmail.com', subject: 'Test thoi', body: 'No body' })
        //const result = await transporter({...req.body, from: 'truongpham2412.dev@gmail.com'})
        try {
            yield (0, mailer_1.sendEmailService)({
                to: 'sieunhankiet@gmail.com',
                subject: 'Hi Dat',
                body: 'Toi chi muon test mail thoi',
            });
            return (0, response_handler_1.sendRes)({
                res: res,
                code: common_1.CODE.OK,
                msg: 'SENT',
                data: null,
            });
        }
        catch (error) {
            return (0, response_handler_1.sendRes)({
                res: res,
                code: common_1.CODE.FAILED,
                msg: 'FAILED',
                data: error,
            });
        }
    });
}
function SingleUpload(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        upload_file_1.default.single('file')(req, res, function (err) {
            if (err) {
                return (0, response_handler_1.sendRes)({
                    res: res,
                    code: common_1.CODE.FAILED,
                    msg: 'UPLOAD FAILED',
                    data: err,
                });
            }
            const fileName = req.file.filename;
            const imageUrl = `https://minamvp.click/api/file/${fileName}`;
            return (0, response_handler_1.sendRes)({
                res: res,
                code: common_1.CODE.CREATED,
                msg: 'UPLOADED',
                data: imageUrl,
            });
        });
    });
}
function getImageByName(req, res) {
    const imageName = req.params.imageName;
    const imagePath = path_1.default.join(__dirname, '..', 'uploads', imageName);
    //console.log(imagePath)
    res.sendFile(imagePath);
}
exports.CommonController = {
    SingleUpload,
    getImageByName,
    Mailer,
};
