import multer from 'multer'
import { FILE } from '../const/common'
import { Request } from 'express'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  },
})

const fileFilter = (req: Request, file: any, cb: any) => {
  // validate kiểu file
  if (FILE.ACCEPT.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error(` Chỉ chấp nhận các file : ${FILE.ACCEPT.toString()}`), false)
  }
}

const uploader = multer({
  storage: storage,
  limits: {
    fileSize: FILE.SIZE,
  },
  fileFilter: fileFilter,
})

export default uploader
